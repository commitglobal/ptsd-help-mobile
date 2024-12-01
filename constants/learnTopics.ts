import { LearnContent } from '@/models/LearnContent.type';

export const learnContentJSON: LearnContent = {
  title: 'Learn About PTSD',
  topics: [
    {
      id: 'image_text',
      label: 'PTSD Overview',
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'image',
            src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
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
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'image',
            src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
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
              url: 'https://www.google.com',
            },
          },
          {
            type: 'button',
            label: 'Call a Specialist',
            action: {
              type: 'phone',
              number: '1234567890',
            },
          },
          {
            type: 'button',
            label: 'Open webview',
            action: {
              type: 'webview',
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
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
      id: 'image_text_button_multi',
      label: 'Testing',
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'multiContent',
            contentArray: [
              {
                type: 'image',
                src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
                alt: 'Understanding PTSD',
              },
              {
                type: 'image',
                src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_emotional-discomfort.jpg',
                alt: 'Msa-tsa',
              },
            ],
          },
          {
            type: 'text',
            content:
              '<p>Explore how PTSD can affect indi viduals differently and what resources are available to help.</p>',
          },
          {
            type: 'button',
            label: 'Learn More',
            action: {
              type: 'external',
              url: 'https://www.google.com',
            },
          },
          {
            type: 'button',
            label: 'Call a Specialist',
            action: {
              type: 'phone',
              number: '1234567890',
            },
          },
          {
            type: 'button',
            label: 'Open webview',
            action: {
              type: 'webview',
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
      id: 'image_text_button_multi_section',
      label: 'Testing',
      icon: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
      content: {
        sections: [
          {
            type: 'multiPage',
            pageArray: [
              [
                {
                  type: 'image',
                  src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/list_i-message.jpg',
                  alt: 'Understanding PTSD',
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
                {
                  type: 'text',
                  content:
                    'Explore how PTSD can affect individuals differently and what resources are available to help.',
                },
              ],
              [
                {
                  type: 'image',
                  src: 'file:///Users/andrewradulescu/Library/Developer/CoreSimulator/Devices/8AF6B9B2-FEC7-4FB2-9CB8-95038513C33F/data/Containers/Data/Application/E5F441FE-82D2-4634-9E8B-041A8D8A379F/Documents/assets/old-couple.png',
                  alt: 'Understanding PTSD',
                },
                {
                  type: 'text',
                  content:
                    '2. Explore how PTSD can affect individuals differently and what resources are available to help.',
                },
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
            ],
          },
        ],
      },
    },
  ],
};
