import { LearnContent } from './learn.type';
import * as FileSystem from 'expo-file-system';
import { getS3CMSContentFolder } from '@/constants/cms';
import { Category, Section, Topic } from '@/services/learn/learn.type';
import { getLocalLearnContentDir, getLocalLearnContentFilePath } from './learn.helper';
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

  async processCategories(remoteContent: any, contentDir: string): Promise<Category[]> {
    return Promise.all(
      remoteContent.categories.map(async (category: Category) => {
        const processedIcon = category.icon ? await this.downloadImage(category.icon, contentDir) : category.icon;

        const processedTopics: Topic[] = await Promise.all(
          category.topics.map(async (topic: Topic) => {
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
          ...category,
          icon: processedIcon,
          topics: processedTopics,
        };
      })
    );
  }
}

const getLocalLearnContent = async (countryCode: string, languageCode: string) => {
  try {
    const localContentPath = getLocalLearnContentFilePath(countryCode, languageCode);
    const localContentJson = await FileSystem.readAsStringAsync(localContentPath);
    return JSON.parse(localContentJson);
  } catch (error) {
    console.log('No existing local learn content found', error);
    return null;
  }
};

const getRemoteLearnContent = async (countryCode: string, languageCode: string) => {
  try {
    const response = await fetch(getS3CMSContentFolder(countryCode, languageCode));
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
    for (let key in obj) {
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

export const fetchLearnContent = async (
  countryCode: string,
  languageCode: string,
  onProgress?: (progress: DownloadProgress) => void
) => {
  const progressTracker = new DownloadProgressTracker(onProgress);
  const downloader = new LearnContentDownloader(progressTracker);

  const [localContent, remoteContent] = await Promise.all([
    getLocalLearnContent(countryCode, languageCode),
    getRemoteLearnContent(countryCode, languageCode),
  ]);

  if (!localContent && !remoteContent) {
    console.log('❌ No local or remote learn content found');
    return null;
  }

  const shouldUpdateLocal =
    !localContent || new Date(remoteContent?.lastUpdatedAt) > new Date(localContent?.lastUpdatedAt);

  const contentDir = getLocalLearnContentDir(countryCode, languageCode);
  await FileSystem.makeDirectoryAsync(contentDir, { intermediates: true });

  if (shouldUpdateLocal && remoteContent) {
    progressTracker.setTotalFiles(extractFileNames(remoteContent).length);

    const processedCategories = await downloader.processCategories(remoteContent, contentDir);

    const toReturn: LearnContent = {
      ...remoteContent,
      categories: processedCategories,
    };

    const usedFiles = new Set(extractFileNames(toReturn));
    await deleteUnusedFiles(contentDir, usedFiles);

    const localContentPath = getLocalLearnContentFilePath(countryCode, languageCode);
    await FileSystem.writeAsStringAsync(localContentPath, JSON.stringify(toReturn, null, 2));

    return toReturn;
  }

  if (!shouldUpdateLocal) {
    progressTracker.setTotalFiles(0);
  }

  return localContent;
};
