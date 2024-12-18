type ActionType = 'start_tool' | 'external' | 'phone' | 'webview' | 'share';

type BaseAction = {
  type: ActionType;
};

type StartToolAction = BaseAction & {
  type: 'start_tool';
  toolId: string;
};

type ExternalAction = BaseAction & {
  type: 'external';
  url: string;
};

type PhoneAction = BaseAction & {
  type: 'phone';
  number: string;
};

type WebviewAction = BaseAction & {
  type: 'webview';
  url: string;
};

type ShareAction = BaseAction & {
  type: 'share';
  message: string;
};

type Action = StartToolAction | ExternalAction | PhoneAction | WebviewAction | ShareAction;

type BaseContent = {
  type: string;
};

export type ImageContent = BaseContent & {
  type: 'image';
  src: string;
  alt: string;
};

export type TextContent = BaseContent & {
  type: 'text';
  content: string;
};

export type RichTextContent = BaseContent & {
  type: 'rich-text';
  content: string;
};

export type ButtonContent = BaseContent & {
  type: 'button';
  label: string;
  action: Action;
};

export type MultiContent = BaseContent & {
  type: 'multiContent';
  contentArray: (ImageContent | RichTextContent | TextContent | ButtonContent)[];
};

export type Section = ImageContent | TextContent | RichTextContent | ButtonContent | MultiContent | MultiPage;

export type MultiPage = BaseContent & {
  type: 'multiPage';
  pageArray: Section[][];
};

export type Topic = {
  type: 'topic';
  id: string;
  label: string;
  icon: string;
  content: {
    sections: Section[];
  };
};

export type Category = {
  type: 'category';
  id: string;
  label: string;
  icon: string;
  topics: Topic[];
};

export type ContentPage = Category | Topic;

export type ContentType = {
  lastUpdatedAt: string;
  title: string;
  pages: ContentPage[];
};
