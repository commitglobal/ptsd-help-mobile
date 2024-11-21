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
    photoUrl: require('@/assets/images/tools/relationship/list_category-icon.jpg'),
    route: '/tools/relationships',
    type: ToolType.CATEGORY,
    subcategories: {
      RECONNECT_WITH_PARTNER: {
        id: '1',
        label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.label,
        photoUrl: require('@/assets/images/tools/relationship/list_reconnect-with-partner.jpg'),
        route: '/tools/relationships/reconnect-with-partner',
        type: ToolType.TOOL,
      },
      POSITIVE_COMMUNICATION: {
        id: '2',
        label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.label,
        photoUrl: require('@/assets/images/tools/relationship/list_positive-communication.jpg'),
        route: '/tools/relationships/positive-communication',
        type: ToolType.TOOL,
      },
      I_MESSAGES: {
        id: '3',
        label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.I_MESSAGES.label,
        photoUrl: require('@/assets/images/tools/relationship/list_i-message.jpg'),
        route: '/tools/relationships/iMessages',
        type: ToolType.TOOL,
      },
      HEALTHY_ARGUMENTS: {
        id: '4',
        label: TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS.label,
        photoUrl: require('@/assets/images/tools/relationship/list_healthy-arguments.jpg'),
        route: '/tools/relationships/healthy-arguments',
        type: ToolType.TOOL,
      },
    },
  },
  AMBIENT_SOUNDS: {
    id: 'tool-3',
    label: TOOLS_TRANSLATIONS_CONFIG.AMBIENT_SOUNDS.label,
    photoUrl: require('@/assets/images/tools/ambient-sounds/list_ambient-sounds.jpg'),
    route: '/tools/ambient-sounds',
    type: ToolType.TOOL,
  },
  MINDFULNESS: {
    id: 'tool-4',
    label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.label,
    photoUrl: require('@/assets/images/tools/mindfulness/list_mindfulness.jpg'),
    route: '/tools/mindfulness',
    type: ToolType.CATEGORY,
    subcategories: {
      CONSCIOUS_BREATHING: {
        id: '1',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.label,
        photoUrl: require('@/assets/images/tools/mindfulness/mindful-breathing/list_mindful-breathing.png'),
        route: '/tools/mindfulness/conscious-breathing',
        type: ToolType.TOOL,
      },
      MINDFUL_WALKING: {
        id: '2',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.MINDFUL_WALKING.label,
        photoUrl: require('@/assets/images/tools/mindfulness/mindful-walking/list_mindful-walking.png'),
        route: '/tools/mindfulness/mindful-walking',
        type: ToolType.TOOL,
      },
      EMOTIONAL_DISCOMFORT: {
        id: '3',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.label,
        photoUrl: require('@/assets/images/tools/mindfulness/emotional-discomfort/list_emotional-discomfort.jpg'),
        route: '/tools/mindfulness/emotional-discomfort',
        type: ToolType.TOOL,
      },
      SENSE_AWARENESS: {
        id: '4',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.SENSE_AWARENESS.label,
        photoUrl: require('@/assets/images/tools/mindfulness/sense-awarness/list_sense-awarness.jpg'),
        route: '/tools/mindfulness/sense-awareness',
        type: ToolType.TOOL,
      },
      LOVING_KINDNESS: {
        id: '5',
        label: TOOLS_TRANSLATIONS_CONFIG.MINDFULNESS.subcategories.LOVING_KINDNESS.label,
        photoUrl: require('@/assets/images/tools/mindfulness/loving-kindness/list_loving-kindness.jpg'),
        route: '/tools/mindfulness/loving-kindness',
        type: ToolType.TOOL,
      },
    },
  },
  MY_FEELINGS: {
    id: 'tool-5',
    label: TOOLS_TRANSLATIONS_CONFIG.MY_FEELINGS.label,
    photoUrl: require('@/assets/images/tools/my-feelings/my_feelings.jpg'),
    route: '/tools/my-feelings',
    type: ToolType.TOOL,
  },
};
