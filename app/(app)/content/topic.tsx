import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/Typography';
import { ScrollView, XStack, YStack } from 'tamagui';
import { Dimensions, Image, Linking, Share } from 'react-native';
import RenderHTML from 'react-native-render-html';
import Button from '@/components/Button';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import {
  ButtonContent,
  ImageContent,
  MultiContent,
  MultiPage,
  RichTextContent,
  Section,
  TextContent,
  Topic,
} from '@/services/content/content.type';

type ContentRendererProps = {
  section: Section;
};

function ImageContentComponent({ content }: { content: ImageContent }) {
  return (
    <Image
      source={{ uri: content.src }}
      style={{ width: '100%', height: 200 }}
      resizeMode='cover'
      accessibilityLabel={content.alt}
    />
  );
}

function RichTextContentComponent({ content }: { content: RichTextContent }) {
  const width = Dimensions.get('window').width;

  // ! There is "Support for defaultProps will be removed from function components" Error
  // ! Discussed here, to be fixed soon:  https://github.com/Expensify/App/pull/52917
  return (
    <XStack paddingHorizontal='$md'>
      <RenderHTML
        source={{ html: content.content }}
        contentWidth={width - 32}
        // @ts-ignore
        tagsStyles={tagsStyles}
        systemFonts={['DMSansRegular', 'DMSansBold']}
      />
    </XStack>
  );
}

function TextContentComponent({ content }: { content: TextContent }) {
  return (
    <XStack paddingHorizontal='$md'>
      <Typography>{content.content}</Typography>
    </XStack>
  );
}

function ButtonContentComponent({ content }: { content: ButtonContent }) {
  const { startTool, getToolById } = useToolManagerContext();
  const { learnContent } = useAssetsManagerContext();

  const handlePress = () => {
    switch (content.action.type) {
      case 'start_tool': {
        // Handle in-app navigation
        const tool = getToolById(content.action.toolId);
        if (tool) {
          startTool(tool, `/content/category?type=learn&pageId=${learnContent.pages[0].id}`);
        } else {
          // TODO: Show toast
          console.error('❌ Tool not found', content.action.toolId);
        }
        break;
      }
      case 'external':
        // Handle external URL
        Linking.openURL(content.action.url);
        break;
      case 'phone':
        // Handle phone call
        Linking.openURL(`tel:${content.action.number}`);
        break;
      case 'webview':
        // Handle webview
        router.push({ pathname: '/(app)/webview', params: { url: content.action.url } });
        break;
      case 'share': {
        Share.share({
          message: content.action.message,
        });
        break;
      }
      default:
        console.error('❌ Unknown button action', content.action);
        break;
    }
  };

  return (
    <XStack paddingHorizontal='$md'>
      <Button preset='secondary' flex={1} onPress={handlePress}>
        {content.label}
      </Button>
    </XStack>
  );
}

function MultiContentComponent({ content }: { content: MultiContent }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentContent = content.contentArray[currentIndex];
  const insets = useSafeAreaInsets();

  return (
    <YStack gap='$xs'>
      <ContentRenderer section={currentContent} />
      <XStack gap='$xs' paddingHorizontal='$md' marginTop='auto' paddingBottom={insets.bottom + 16}>
        <Button
          preset='secondary'
          icon={<Icon icon='chevronLeft' width={24} height={24} color='$gray12' />}
          flex={1}
          onPress={() => {
            if (currentIndex === 0) {
              setCurrentIndex(content.contentArray.length - 1);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        />

        <Button
          preset='secondary'
          icon={<Icon icon='chevronRight' width={24} height={24} color='$gray12' />}
          flex={1}
          onPress={() => {
            if (currentIndex === content.contentArray.length - 1) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex + 1);
            }
          }}
        />
      </XStack>
    </YStack>
  );
}

function MultiPageComponent({ content }: { content: MultiPage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPage = content.pageArray[currentIndex];

  return (
    <YStack gap='$xs' flex={1}>
      {currentPage.map((section: Section, index: number) => (
        <ContentRenderer key={index} section={section} />
      ))}
      <XStack gap='$xs' paddingHorizontal='$md' marginTop='auto' paddingBottom='$md'>
        <Button
          preset='secondary'
          icon={<Icon icon='chevronLeft' width={24} height={24} color='$gray12' />}
          flex={1}
          onPress={() => {
            if (currentIndex === 0) {
              setCurrentIndex(content.pageArray.length - 1);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        />

        <Button
          preset='secondary'
          icon={<Icon icon='chevronRight' width={24} height={24} color='$gray12' />}
          flex={1}
          onPress={() => {
            if (currentIndex === content.pageArray.length - 1) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex + 1);
            }
          }}
        />
      </XStack>
    </YStack>
  );
}

export function ContentRenderer({ section }: ContentRendererProps) {
  switch (section.type) {
    case 'image':
      return <ImageContentComponent content={section} />;
    case 'text':
      return <TextContentComponent content={section} />;
    case 'rich-text':
      return <RichTextContentComponent content={section} />;
    case 'button':
      return <ButtonContentComponent content={section} />;
    case 'multiContent':
      return <MultiContentComponent content={section} />;
    case 'multiPage':
      return <MultiPageComponent content={section} />;
    default:
      return <Typography>{JSON.stringify(section)} Unknown type</Typography>;
  }
}

export default function LearnTopic() {
  const { type, categoryId, topicId } = useLocalSearchParams<{
    type: 'support' | 'learn';
    categoryId: string;
    topicId: string;
  }>();

  const { learnContent, supportContent } = useAssetsManagerContext();
  const insets = useSafeAreaInsets();

  const topic = useMemo(() => {
    const contentManager = type === 'learn' ? learnContent : supportContent;

    // If no categoryId is provided, search for the topic directly in pages
    if (!categoryId) {
      const topic = contentManager.pages.find((page) => page.id === topicId);
      if (!topic) {
        return null;
      }
      return topic as Topic;
    }

    // Find the category page that matches the categoryId
    const category = contentManager.pages.find((category) => category.id === categoryId);
    if (!category) {
      return null;
    }

    // If it's a category page, search for the topic in its topics array
    if (category.type === 'category') {
      return category.topics.find((topic) => topic.id === topicId);
    }

    // If not a category, return the page itself as it must be a topic
    return category;
  }, [learnContent, supportContent, categoryId, topicId, type]);

  if (!topic) {
    return <Typography>Topic not found</Typography>;
  }

  return (
    <Screen
      headerProps={{
        title: topic?.label,
        iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <ScrollView
        contentContainerStyle={{ padding: 0, paddingBottom: insets?.bottom, gap: 32, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <YStack gap='$sm' flexGrow={1}>
          {topic?.content.sections.map((section, index) => <ContentRenderer key={index} section={section} />)}
        </YStack>
      </ScrollView>
    </Screen>
  );
}

const tagsStyles = {
  body: {
    fontFamily: 'DMSansRegular',
    lineHeight: 24,
  },
  p: {
    margin: 0,
    marginBottom: 8,
  },
  h1: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'DMSansBold',
  },
  a: {
    color: 'hsl(272, 56%, 45%)',
    fontWeight: '700',
    textDecoration: 'underline',
    textDecorationColor: 'hsl(272, 56%, 45%)',
  },
  ul: {
    maxWidth: '100%',
  },
  li: {
    marginBottom: 4,
  },
};
