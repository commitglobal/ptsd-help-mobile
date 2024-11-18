import { Href } from 'expo-router';
import { TOOLS_TRANSLATIONS_CONFIG } from './translations.config';

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
  subcategories?: Record<string, Tool>;
};

export const TOOLS_CONFIG: Record<string, Tool> = {
  RELATIONSHIPS: {
    id: 'tool-1',
    label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.label,
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: '/tools/relationships',
    type: ToolType.CATEGORY,
    subcategories: {
      RECONNECT_WITH_PARTNER: {
        id: '1',
        label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.label,
        photoUrl: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=150&h=150&fit=crop',
        route: '/tools/relationships/reconnect-with-partner',
        type: ToolType.TOOL,
      },
      POSITIVE_COMMUNICATION: {
        id: '2',
        label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.label,
        photoUrl: 'https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=150&h=150&fit=crop',
        route: '/tools/relationships/positive-communication',
        type: ToolType.TOOL,
      },
      I_MESSAGES: {
        id: '3',
        label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.I_MESSAGES.label,
        photoUrl: 'https://images.unsplash.com/photo-1582056615449-5dcb2332b3b2?w=150&h=150&fit=crop',
        route: '/tools/relationships/iMessages',
        type: ToolType.TOOL,
      },
    },
  },

  POSITIVE_COMMUNICATION: {
    id: 'tool-2',
    label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.label,
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: '/tools/relationships/positive-communication',
    type: ToolType.TOOL,
  },
  AMBIENT_SOUNDS: {
    id: 'tool-3',
    label: TOOLS_TRANSLATIONS_CONFIG.AMBIENT_SOUNDS.label,
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: '/tools/ambient-sounds',
    type: ToolType.TOOL,
  },
  MINDFULNESS: {
    id: 'tool-4',
    label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.label,
    photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    route: '/tools/mindfulness',
    type: ToolType.CATEGORY,
    subcategories: {
      CONSCIOUS_BREATHING: {
        id: '1',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.label,
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: '/tools/mindfulness/conscious-breathing',
        type: ToolType.TOOL,
      },
      MINDFUL_WALKING: {
        id: '2',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.MINDFUL_WALKING.label,
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: '/tools/mindfulness/mindful-walking',
        type: ToolType.TOOL,
      },
      EMOTIONAL_DISCOMFORT: {
        id: '3',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.label,
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: '/tools/mindfulness/emotional-discomfort',
        type: ToolType.TOOL,
      },
      SENSE_AWARENESS: {
        id: '4',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.SENSE_AWARENESS.label,
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: '/tools/mindfulness/sense-awareness',
        type: ToolType.TOOL,
      },
      LOVING_KINDNESS: {
        id: '5',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.LOVING_KINDNESS.label,
        photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
        route: '/tools/mindfulness/loving-kindness',
        type: ToolType.TOOL,
      },
    },
  },
};
