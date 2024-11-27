import { Href } from 'expo-router';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

const DUMMY_PHOTO = require('@/assets/images/old-couple.png');

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
  subcategories?: Partial<Record<ToolSubcategories, Tool>>;
};

export type ToolConfigType = Record<ToolCategories, Tool>;

type ToolCategories = 'RELATIONSHIPS' | 'AMBIENT_SOUNDS' | 'MINDFULNESS' | 'PAUSE';

type ToolSubcategories =
  | 'RECONNECT_WITH_PARTNER'
  | 'POSITIVE_COMMUNICATION'
  | 'I_MESSAGES'
  | 'HEALTHY_ARGUMENTS'
  | 'CONSCIOUS_BREATHING'
  | 'MINDFUL_WALKING'
  | 'EMOTIONAL_DISCOMFORT'
  | 'SENSE_AWARENESS'
  | 'LOVING_KINDNESS';

export const useTools = () => {
  const { mediaMapping } = useAssetsManagerContext();
  const { toolsTranslationKeys } = useTranslationKeys();
  const TOOLS_CONFIG: ToolConfigType = {
    RELATIONSHIPS: {
      id: 'relationships',
      label: toolsTranslationKeys.RELATIONSHIPS.label,
      photoUrl: mediaMapping?.['RELATIONSHIPS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/relationships',
      type: ToolType.CATEGORY,
      subcategories: {
        RECONNECT_WITH_PARTNER: {
          id: 'relationships-reconnect-with-partner',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.label,
          photoUrl: mediaMapping?.['RELATIONSHIPS.RECONNECT_WITH_PARTNER.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/reconnect-with-partner',
          type: ToolType.TOOL,
        },
        POSITIVE_COMMUNICATION: {
          id: 'relationships-positive-communication',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.label,
          photoUrl: mediaMapping?.['RELATIONSHIPS.POSITIVE_COMMUNICATION.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/positive-communication',
          type: ToolType.TOOL,
        },
        I_MESSAGES: {
          id: 'relationships-i-messages',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.label,
          photoUrl: mediaMapping?.['RELATIONSHIPS.I_MESSAGES.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/iMessages',
          type: ToolType.TOOL,
        },
        HEALTHY_ARGUMENTS: {
          id: 'relationships-healthy-arguments',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS.label,
          photoUrl: mediaMapping?.['RELATIONSHIPS.HEALTHY_ARGUMENTS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/healthy-arguments',
          type: ToolType.TOOL,
        },
      },
    },
    AMBIENT_SOUNDS: {
      id: 'ambient-sounds',
      label: toolsTranslationKeys.AMBIENT_SOUNDS.label,
      photoUrl: mediaMapping?.['AMBIENT_SOUNDS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/ambient-sounds',
      type: ToolType.TOOL,
    },
    MINDFULNESS: {
      id: 'mindfulness',
      label: toolsTranslationKeys.MINDFULNESS.label,
      photoUrl: mediaMapping?.['MINDFULNESS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/mindfulness',
      type: ToolType.CATEGORY,
      subcategories: {
        CONSCIOUS_BREATHING: {
          id: 'mindfulness-conscious-breathing',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.label,
          photoUrl: mediaMapping?.['MINDFULNESS.CONSCIOUS_BREATHING.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/conscious-breathing',
          type: ToolType.TOOL,
        },
        MINDFUL_WALKING: {
          id: 'mindfulness-mindful-walking',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.label,
          photoUrl: mediaMapping?.['MINDFULNESS.MINDFUL_WALKING.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/mindful-walking',
          type: ToolType.TOOL,
        },
        EMOTIONAL_DISCOMFORT: {
          id: 'mindfulness-emotional-discomfort',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.label,
          photoUrl: mediaMapping?.['MINDFULNESS.EMOTIONAL_DISCOMFORT.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/emotional-discomfort',
          type: ToolType.TOOL,
        },
        SENSE_AWARENESS: {
          id: 'mindfulness-sense-awareness',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.label,
          photoUrl: mediaMapping?.['MINDFULNESS.SENSE_AWARENESS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/sense-awareness',
          type: ToolType.TOOL,
        },
        LOVING_KINDNESS: {
          id: 'mindfulness-loving-kindness',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.label,
          photoUrl: mediaMapping?.['MINDFULNESS.LOVING_KINDNESS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/loving-kindness',
          type: ToolType.TOOL,
        },
      },
    },
    PAUSE: {
      id: 'pause',
      label: toolsTranslationKeys.PAUSE.label,
      photoUrl: mediaMapping?.['PAUSE.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/pause',
      type: ToolType.TOOL,
    },
  };

  return TOOLS_CONFIG;
};