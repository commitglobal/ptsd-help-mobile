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

  private async downloadImage(imageSrc: string, contentDir: string, relativeContentDir: string): Promise<string> {
    const imageFileName = imageSrc.split('/').pop();
    const localImagePath = `${contentDir}/${imageFileName}`;
    const localRelativeImagePath = `${relativeContentDir}/${imageFileName}`;
    try {
      await FileSystem.downloadAsync(imageSrc, localImagePath);
      this.progressTracker.incrementDownloaded();
    } catch (error) {
      console.error('Error downloading image:', error);
      return '';
    }
    return localRelativeImagePath;
  }

  private async processContentArray(contentArray: any[], contentDir: string, relativeContentDir: string) {
    return Promise.all(
      contentArray.map(async (content) => {
        if (content.type === 'image') {
          return {
            ...content,
            src: await this.downloadImage(content.src, contentDir, relativeContentDir),
          };
        }
        return content;
      })
    );
  }

  private async processSection(section: Section, contentDir: string, relativeContentDir: string): Promise<Section> {
    if (section.type === 'image') {
      return {
        ...section,
        src: await this.downloadImage(section.src, contentDir, relativeContentDir),
      };
    }

    if (section.type === 'multiContent') {
      return {
        ...section,
        contentArray: await this.processContentArray(section.contentArray, contentDir, relativeContentDir),
      };
    }

    if (section.type === 'multiPage') {
      const processedPages = await Promise.all(
        section.pageArray.map((page) => this.processContentArray(page, contentDir, relativeContentDir))
      );

      return {
        ...section,
        pageArray: processedPages,
      };
    }

    return section;
  }

  async processCategories(
    remoteContent: ContentType,
    contentDir: string,
    relativeContentDir: string
  ): Promise<ContentPage[]> {
    return Promise.all(
      remoteContent.pages?.map(async (contentPage: ContentPage) => {
        const processedIcon = contentPage.icon
          ? await this.downloadImage(contentPage.icon, contentDir, relativeContentDir)
          : contentPage.icon;

        const topicsToProcess = contentPage.type === 'category' ? contentPage.topics : [contentPage];

        const processedTopics: Topic[] = await Promise.all(
          topicsToProcess.map(async (topic: Topic) => {
            const processedTopicIcon = topic.icon
              ? await this.downloadImage(topic.icon, contentDir, relativeContentDir)
              : topic.icon;

            const processedSections: Section[] = await Promise.all(
              topic.content.sections.map((section) => this.processSection(section, contentDir, relativeContentDir))
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
  let localContentJson: string;
  try {
    localContentJson = await FileSystem.readAsStringAsync(config.localContentMappingFilePath);
  } catch (error) {
    console.log('No existing local learn content found', error);
    return null;
  }

  try {
    return JSON.parse(localContentJson);
  } catch (error) {
    // The file exists but isn't parseable (interrupted write, disk corruption).
    // Delete it here — a parse failure never reaches the shape-validation cleanup
    // in fetchLearnContent, so otherwise it would be re-read and re-logged forever.
    console.warn(`⚠️ Deleting corrupt local ${config.type} content at ${config.localContentMappingFilePath}`, error);
    try {
      await FileSystem.deleteAsync(config.localContentMappingFilePath, { idempotent: true });
    } catch (deleteError) {
      console.error('Error deleting corrupt local content:', deleteError);
    }
    return null;
  }
};

// A cached file written by an older schema (top-level `categories` instead of
// `pages`) or a partial/interrupted write must not be trusted: every consumer
// reads `content.pages`, so an invalid shape crashes the render tree.
const isValidContent = (content: any): content is ContentType =>
  !!content && Array.isArray(content.pages) && content.pages.length > 0;

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
  localRelativeContentDir: string;
  countryCode: string;
  languageCode: string;
  onProgress?: (progress: DownloadProgress) => void;
};

export const fetchLearnContent = async (config: ContentFetcherConfig) => {
  const progressTracker = new DownloadProgressTracker(config.onProgress);
  const downloader = new LearnContentDownloader(progressTracker);

  let [localContent, remoteContent] = await Promise.all([
    getLocalLearnContent(config),
    getRemoteLearnContent(config),
  ]);

  // Discard a malformed local cache and re-download from remote instead of
  // handing broken content to the app.
  if (localContent && !isValidContent(localContent)) {
    console.warn(`⚠️ Ignoring malformed local ${config.type} content at ${config.localContentMappingFilePath}`);
    try {
      await FileSystem.deleteAsync(config.localContentMappingFilePath, { idempotent: true });
    } catch (error) {
      console.error('Error deleting malformed local content:', error);
    }
    localContent = null;
  }

  if (!localContent && !remoteContent) {
    console.log('❌ No local or remote learn content found');
    return null;
  }

  const shouldUpdateLocal =
    !localContent ||
    (remoteContent && new Date(remoteContent?.lastUpdatedAt) > new Date(localContent?.lastUpdatedAt || ''));

  await FileSystem.makeDirectoryAsync(config.localContentDir, { intermediates: true });

  if (shouldUpdateLocal && isValidContent(remoteContent)) {
    progressTracker.setTotalFiles(extractFileNames(remoteContent).length);

    const processedCategories = await downloader.processCategories(
      remoteContent,
      config.localContentDir,
      config.localRelativeContentDir
    );

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

  return isValidContent(localContent) ? localContent : null;
};
