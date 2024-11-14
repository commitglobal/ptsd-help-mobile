import i18n from '@/common/config/i18n';
import { Href } from 'expo-router';

enum ToolType {
  CATEGORY = 'category',
  TOOL = 'tool',
}

export type Tool = {
  id: string;
  label: string;
  photoUrl: string;
  route: Href;
  type: ToolType;
  active?: boolean;
  subcategories?: Tool[];
};

export const TOOLS_REGISTRY_MOCK: Record<string, Tool> = {
  RELATIONSHIPS: {
    id: 'tool-1',
    label: i18n.t('list.relationships', { ns: 'tools' }),
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: '/tools/relationships',
    type: ToolType.CATEGORY,
    subcategories: [
      {
        id: '1',
        label: i18n.t('list.reconnect-with-partner', { ns: 'tools' }),
        photoUrl: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=150&h=150&fit=crop',
        route: '/tools/relationships/reconnect-with-partner',
        type: ToolType.TOOL,
      },
      {
        id: '2',
        label: i18n.t('list.positive-communication', { ns: 'tools' }),
        photoUrl: 'https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=150&h=150&fit=crop',
        route: '/tools/relationships/positive-communication',
        type: ToolType.TOOL,
      },
      {
        id: '3',
        label: i18n.t('list.i-messages', { ns: 'tools' }),
        photoUrl: 'https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=150&h=150&fit=crop',
        route: '/tools/relationships/iMessages',
        type: ToolType.TOOL,
      },
    ],
  },
  POSITIVE_COMMUNICATION: {
    id: 'tool-2',
    label: i18n.t('list.positive-communication', { ns: 'tools' }),
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: '/tools/relationships/positive-communication',
    type: ToolType.TOOL,
  },
};
