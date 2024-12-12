import { ContentType, ContentPage, Section, Topic } from './content.type';
import * as FileSystem from 'expo-file-system';
import { DownloadProgressTracker, DownloadProgress } from '@/helpers/download-progress';

const deleteUnusedFiles = async (contentDir: string, usedFiles: Set<string>) => {
  const existingFiles = new Set(await FileSystem.readDirectoryAsync(contentDir));
  for (const file of existingFiles) {
    if (!usedFiles.has(file)) {
      try {
        await FileSystem.deleteAsync(`${contentDir}/${file}`);
        console.log(`Deleted unused file from learn: ${file}`);
      } catch (error) {
        console.error(`Error deleting file ${file}:`, error);
      }
    }
  }
};

class LearnContentDownloader {
  private progressTracker: DownloadProgressTracker;

  constructor(progressTracker: DownloadProgressTracker) {
    this.progressTracker = progressTracker;
  }

  private async downloadImage(imageSrc: string, contentDir: string): Promise<string> {
    const imageFileName = imageSrc.split('/').pop();
    const localImagePath = `${contentDir}/${imageFileName}`;
    try {
      await FileSystem.downloadAsync(imageSrc, localImagePath);
      this.progressTracker.incrementDownloaded();
    } catch (error) {
      console.error('Error downloading image:', error);
      return '';
    }
    return localImagePath;
  }

  private async processContentArray(contentArray: any[], contentDir: string) {
    return Promise.all(
      contentArray.map(async (content) => {
        if (content.type === 'image') {
          return {
            ...content,
            src: await this.downloadImage(content.src, contentDir),
          };
        }
        return content;
      })
    );
  }

  private async processSection(section: Section, contentDir: string): Promise<Section> {
    if (section.type === 'image') {
      return {
        ...section,
        src: await this.downloadImage(section.src, contentDir),
      };
    }

    if (section.type === 'multiContent') {
      return {
        ...section,
        contentArray: await this.processContentArray(section.contentArray, contentDir),
      };
    }

    if (section.type === 'multiPage') {
      const processedPages = await Promise.all(
        section.pageArray.map((page) => this.processContentArray(page, contentDir))
      );

      return {
        ...section,
        pageArray: processedPages,
      };
    }

    return section;
  }

  async processCategories(remoteContent: ContentType, contentDir: string): Promise<ContentPage[]> {
    return Promise.all(
      remoteContent.pages?.map(async (contentPage: ContentPage) => {
        const processedIcon = contentPage.icon
          ? await this.downloadImage(contentPage.icon, contentDir)
          : contentPage.icon;

        const topicsToProcess = contentPage.type === 'category' ? contentPage.topics : [contentPage];

        const processedTopics: Topic[] = await Promise.all(
          topicsToProcess.map(async (topic: Topic) => {
            const processedTopicIcon = topic.icon ? await this.downloadImage(topic.icon, contentDir) : topic.icon;

            const processedSections: Section[] = await Promise.all(
              topic.content.sections.map((section) => this.processSection(section, contentDir))
            );

            return {
              ...topic,
              icon: processedTopicIcon,
              content: {
                ...topic.content,
                sections: processedSections,
              },
            };
          })
        );

        return {
          ...contentPage,
          icon: processedIcon,
          topics: processedTopics,
        };
      })
    );
  }
}

const getLocalLearnContent = async (config: ContentFetcherConfig) => {
  try {
    const localContentJson = await FileSystem.readAsStringAsync(config.localContentMappingFilePath);
    return JSON.parse(localContentJson);
  } catch (error) {
    console.log('No existing local learn content found', error);
    return null;
  }
};

const getRemoteLearnContent = async (config: ContentFetcherConfig): Promise<ContentType | null> => {
  try {
    const response = await fetch(config.remoteContentFolderUrl);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching remote learn content:', error);
    return null;
  }
};

function extractFileNames(jsonObj: any) {
  const fileNames: string[] = [];

  function traverse(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key]);
      } else if (key === 'icon' || key === 'src') {
        const url = obj[key];
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        fileNames.push(fileName);
      }
    }
  }

  traverse(jsonObj);
  return fileNames;
}

export type ContentFetcherConfig = {
  type: 'learn' | 'support';
  remoteContentFolderUrl: string;
  localContentDir: string;
  localContentMappingFilePath: string; // The file where the content mapping is saved
  countryCode: string;
  languageCode: string;
  onProgress?: (progress: DownloadProgress) => void;
};

export const fetchLearnContent = async (config: ContentFetcherConfig) => {
  const progressTracker = new DownloadProgressTracker(config.onProgress);
  const downloader = new LearnContentDownloader(progressTracker);

  const [localContent, remoteContent] = await Promise.all([
    getLocalLearnContent(config),
    getRemoteLearnContent(config),
  ]);

  if (!localContent && !remoteContent) {
    console.log('❌ No local or remote learn content found');
    return null;
  }

  const shouldUpdateLocal =
    !localContent ||
    (remoteContent && new Date(remoteContent?.lastUpdatedAt) > new Date(localContent?.lastUpdatedAt || ''));

  await FileSystem.makeDirectoryAsync(config.localContentDir, { intermediates: true });

  if (shouldUpdateLocal && remoteContent) {
    progressTracker.setTotalFiles(extractFileNames(remoteContent).length);

    const processedCategories = await downloader.processCategories(remoteContent, config.localContentDir);

    const toReturn: ContentType = {
      ...remoteContent,
      pages: processedCategories,
    };

    const usedFiles = new Set(extractFileNames(toReturn));
    await deleteUnusedFiles(config.localContentDir, usedFiles);

    await FileSystem.writeAsStringAsync(config.localContentMappingFilePath, JSON.stringify(toReturn, null, 2));

    return toReturn;
  }

  if (!shouldUpdateLocal) {
    progressTracker.setTotalFiles(0);
  }

  return localContent;
};
