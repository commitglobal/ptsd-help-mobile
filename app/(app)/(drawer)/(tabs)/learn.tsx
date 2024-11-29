import { Screen } from '@/components/Screen';
import { YStack } from 'tamagui';
import { LearnContent } from '@/models/LearnContent.type';
import { Icon } from '@/components/Icon';
import { ListCard } from '@/components/ListCard';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';

// TODOs:
// - Take icons, imagesSrc, save them in the device and save the JSON with the local paths

export const learnContentJSON: LearnContent = {
  title: 'Learn About PTSD',
  topics: [
    {
      id: 'image_text',
      label: 'PTSD Overview',
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'image',
            src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
            alt: 'PTSD awareness',
          },
          {
            type: 'rich-text',
            content:
              '<p><strong>Post-traumatic stress disorder (PTSD)</strong> is caused by exposure to life-threatening or traumatic events.</p><ul><li>Can develop after experiencing or witnessing trauma</li><li>Affects millions of people worldwide</li><li>Treatment options are available</li></ul><p>Learn more below.</p>',
          },
          {
            type: 'text',
            content:
              'PTSD is a mental health condition that can develop after experiencing or witnessing trauma. It affects millions of people worldwide and can be treated with therapy, medication, or a combination of both.',
          },
        ],
      },
    },
    {
      id: 'image_text_button',
      label: 'Understanding PTSD',
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'image',
            src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
            alt: 'Understanding PTSD',
          },
          {
            type: 'text',
            content:
              '<p>Explore how PTSD can affect individuals differently and what resources are available to help.</p>',
          },
          {
            type: 'button',
            label: 'Learn More',
            action: {
              type: 'external',
              url: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
            },
          },
          {
            type: 'text',
            content:
              '<p>Explore how PTSD can affect individuals differently and what resources are available to help.</p>',
          },
          {
            type: 'button',
            label: 'Open tool',
            action: {
              type: 'start_tool',
              toolId: 'relationships-healthy-arguments',
            },
          },
        ],
      },
    },
    {
      id: 'image_multiContent',
      label: 'Treatment Options',
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'image',
            src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
            alt: 'Treatment Options',
          },
          {
            type: 'multiContent',
            contentArray: [
              {
                type: 'rich-text',
                content:
                  "<p>PTSD treatment includes therapy, medication, or both. A <a href='https://example.com/find-specialist'>specialist</a> can guide you to the right treatment plan.</p>",
              },
              {
                type: 'rich-text',
                content:
                  '<p>Many people find relief through cognitive behavioral therapy (CBT) or exposure therapy. Learn more about these approaches.</p>',
              },
              {
                type: 'button',
                label: 'Find a Specialist',
                action: {
                  type: 'start_tool',
                  toolId: 'relationships-healthy-arguments',
                },
              },
            ],
          },
        ],
      },
    },
    {
      id: 'swipable_content',
      label: 'Living with PTSD',
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'swipableContent',
            contentArray: [
              {
                type: 'image',
                src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
                alt: 'Stress Management',
              },
              {
                type: 'text',
                content:
                  'PTSD often involves heightened stress levels. Managing stress through breathing exercises can help.',
              },
              {
                type: 'button',
                label: 'Watch Stress Video',
                action: {
                  type: 'play_video',
                  url: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
                },
              },
              {
                type: 'image',
                src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/891157B1-97BD-466E-BDC4-F4B3C09D27E7/Documents/assets/list_i-message.jpg',
                alt: 'Support Groups',
              },
              {
                type: 'text',
                content: 'Joining a support group can help you connect with others who understand PTSD.',
              },
              {
                type: 'button',
                label: 'Call Support',
                action: {
                  type: 'phone',
                  number: '+1234567890',
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

export default function Learn() {
  return (
    <Screen
      headerProps={{
        title: 'Learn',
        iconRight: <Icon icon='info' color='white' width={24} height={24} />,
      }}>
      <FlashList
        bounces={false}
        data={learnContentJSON.topics}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListCard
            key={item.id}
            item={item}
            onPress={() => {
              router.push(`/learn/${item.id}`);
            }}
          />
        )}
        ItemSeparatorComponent={() => <YStack height={8} />}
        estimatedItemSize={80}
      />
    </Screen>
  );
}
