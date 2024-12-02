import { LearnContent } from './learn.type';
import * as FileSystem from 'expo-file-system';
import { getS3CMSContentFolder } from '@/constants/cms';
import { Category, Section, Topic } from '@/services/learn/learn.type';

export const fetchLearnContent = async (countryCode: string, languageCode: string) => {
  const processImageContent = async (imageSrc: string, contentDir: string): Promise<string> => {
    const imageFileName = imageSrc.split('/').pop();
    const localImagePath = `${contentDir}/${imageFileName}`;
    try {
      await FileSystem.downloadAsync(imageSrc, localImagePath);
    } catch (error) {
      console.error('Error downloading image:', error);
      return '';
    }
    return localImagePath;
  };

  const processSection = async (section: Section, contentDir: string): Promise<Section> => {
    if (section.type === 'image') {
      return {
        ...section,
        src: await processImageContent(section.src, contentDir),
      };
    }

    if (section.type === 'multiContent') {
      const processedContent = await Promise.all(
        section.contentArray.map(async (content) => {
          if (content.type === 'image') {
            return {
              ...content,
              src: await processImageContent(content.src, contentDir),
            };
          }
          return content;
        })
      );

      return {
        ...section,
        contentArray: processedContent,
      };
    }

    if (section.type === 'multiPage') {
      const processedPages = await Promise.all(
        section.pageArray.map(async (page) =>
          Promise.all(
            page.map(async (content) => {
              if (content.type === 'image') {
                return {
                  ...content,
                  src: await processImageContent(content.src, contentDir),
                };
              }
              return content;
            })
          )
        )
      );

      return {
        ...section,
        pageArray: processedPages,
      };
    }

    return section;
  };

  const getLocalLearnContent = async () => {
    try {
      const localContentPath = `${FileSystem.documentDirectory}content/${countryCode}/learn.json`;
      const localContentJson = await FileSystem.readAsStringAsync(localContentPath);
      return JSON.parse(localContentJson);
    } catch (error) {
      console.log('No existing local learn content found', error);
      return null;
    }
  };

  const getRemoteLearnContent = async () => {
    try {
      const response = await fetch(getS3CMSContentFolder(countryCode, languageCode));
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching remote learn content:', error);
      return null;
    }
  };

  const [localContent, remoteContent] = await Promise.all([getLocalLearnContent(), getRemoteLearnContent()]);

  if (!localContent && !remoteContent) {
    return null;
  }

  const shouldUpdateLocal =
    !localContent || new Date(remoteContent?.lastUpdatedAt) > new Date(localContent?.lastUpdatedAt);

  const contentDir = `${FileSystem.documentDirectory}content/${countryCode}/learn`;
  // Create content directory if it doesn't exist
  await FileSystem.makeDirectoryAsync(contentDir, { intermediates: true });

  if (shouldUpdateLocal && remoteContent) {
    // Get list of all files in learn directory
    const existingFiles = new Set(await FileSystem.readDirectoryAsync(contentDir));
    const usedFiles = new Set<string>();

    // Process categories
    const processedCategories: Category[] = await Promise.all(
      remoteContent.categories.map(async (category: Category) => {
        // Process category icon
        const processedIcon = category.icon ? await processImageContent(category.icon, contentDir) : category.icon;
        if (processedIcon) usedFiles.add(processedIcon.split('/').pop()!);

        // Process topics within category
        const processedTopics: Topic[] = await Promise.all(
          category.topics.map(async (topic: Topic) => {
            // Process topic icon
            const processedTopicIcon = topic.icon ? await processImageContent(topic.icon, contentDir) : topic.icon;
            if (processedTopicIcon) usedFiles.add(processedTopicIcon.split('/').pop()!);

            // Process sections
            const processedSections: Section[] = await Promise.all(
              topic.content.sections.map((section) => processSection(section, contentDir))
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

    // Delete files that are not in usedFiles
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

    const toReturn: LearnContent = {
      ...remoteContent,
      categories: processedCategories,
    };

    // Save processed content
    const localContentPath = `${FileSystem.documentDirectory}content/${countryCode}/learn.json`;
    await FileSystem.writeAsStringAsync(localContentPath, JSON.stringify(toReturn, null, 2));

    return toReturn;
  }

  return localContent;
};
