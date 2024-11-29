import { Screen } from '@/components/Screen';
import { Icon } from '@/components/Icon';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/Typography';
import { learnContentJSON } from '../(drawer)/(tabs)/learn';
import { XStack, YStack } from 'tamagui';
import { ButtonContent, ImageContent, RichTextContent, Section, TextContent } from '@/models/LearnContent.type';
import { Dimensions, Image, Linking } from 'react-native';
import RenderHTML from 'react-native-render-html';
import Button from '@/components/Button';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

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
  const { topicId } = useLocalSearchParams();

  console.log('topicId button', topicId);

  const handlePress = () => {
    switch (content.action.type) {
      case 'start_tool': {
        // Handle in-app navigation
        const tool = getToolById(content.action.toolId);
        if (tool) {
          startTool(tool, `/learn/${topicId}`);
        } else {
          // Show toast
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
      case 'play_video':
        // Handle video playback
        // You might want to implement a video player component
        Linking.openURL(content.action.url);
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
    //   case 'multiContent':
    //     return <MultiContent content={section} />;
    //   case 'swipableContent':
    //     return <SwipableContent content={section} />;
    default:
      return <Typography>{section.type} + + Unknown type</Typography>;
  }
}

export default function LearnTopic() {
  const { topicId } = useLocalSearchParams();
  const topic = learnContentJSON.topics.find((topic) => topic.id === topicId);

  console.log('🚀 🚀 🚀 🚀 topicId', topicId);

  return (
    <Screen
      headerProps={{
        title: topic?.label,
        iconRight: <Icon icon='info' color='$gray12' width={24} height={24} />,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}>
      <YStack gap='$sm'>
        {topic?.content.sections.map((section, index) => <ContentRenderer key={index} section={section} />)}
      </YStack>
    </Screen>
  );
}

const tagsStyles = {
  body: {
    color: 'hsl(240, 5%, 34%)',
  },
  p: {
    margin: 0,
    marginBottom: 8,
  },
  h1: {
    fontSize: 24,
    marginVertical: 16,
  },
  a: {
    color: 'hsl(272, 56%, 45%)',
    fontWeight: '700',
    textDecoration: 'underline',
    textDecorationColor: 'hsl(272, 56%, 45%)',
  },
};
