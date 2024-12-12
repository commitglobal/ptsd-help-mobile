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
  icon: string;
  route: Href;
  type: ToolType;
  subcategories?: Partial<Record<ToolSubcategories, Tool>>;
};

export type ToolConfigType = Record<ToolCategories, Tool>;

type ToolCategories =
  | 'RELATIONSHIPS'
  | 'AMBIENT_SOUNDS'
  | 'MINDFULNESS'
  | 'PAUSE'
  | 'MY_FEELINGS'
  | 'WORRY_TIME'
  | 'RID'
  | 'SLEEP'
  | 'MY_STRENGTHS'
  | 'SHIFT_THOUGHTS'
  | 'RECREATIONAL_ACTIVITIES';

type ToolSubcategories =
  | 'RECONNECT_WITH_PARTNER'
  | 'POSITIVE_COMMUNICATION'
  | 'I_MESSAGES'
  | 'HEALTHY_ARGUMENTS'
  | 'CONSCIOUS_BREATHING'
  | 'MINDFUL_WALKING'
  | 'EMOTIONAL_DISCOMFORT'
  | 'SENSE_AWARENESS'
  | 'LOVING_KINDNESS'
  | 'SLEEP_HELP'
  | 'SLEEP_HABITS'
  | 'SLEEP_PERSPECTIVE'
  | 'RECREATIONAL_ACTIVITIES_ALONE'
  | 'RECREATIONAL_ACTIVITIES_CITY'
  | 'RECREATIONAL_ACTIVITIES_NATURE';

export const useTools = () => {
  const { mediaMapping } = useAssetsManagerContext();
  const { toolsTranslationKeys } = useTranslationKeys();
  const TOOLS_CONFIG: ToolConfigType = {
    RELATIONSHIPS: {
      id: 'relationships',
      label: toolsTranslationKeys.RELATIONSHIPS.label,
      icon: mediaMapping?.['RELATIONSHIPS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/relationships',
      type: ToolType.CATEGORY,
      subcategories: {
        RECONNECT_WITH_PARTNER: {
          id: 'relationships-reconnect-with-partner',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.label,
          icon: mediaMapping?.['RELATIONSHIPS.RECONNECT_WITH_PARTNER.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/reconnect-with-partner',
          type: ToolType.TOOL,
        },
        POSITIVE_COMMUNICATION: {
          id: 'relationships-positive-communication',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.label,
          icon: mediaMapping?.['RELATIONSHIPS.POSITIVE_COMMUNICATION.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/positive-communication',
          type: ToolType.TOOL,
        },
        I_MESSAGES: {
          id: 'relationships-i-messages',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.label,
          icon: mediaMapping?.['RELATIONSHIPS.I_MESSAGES.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/iMessages',
          type: ToolType.TOOL,
        },
        HEALTHY_ARGUMENTS: {
          id: 'relationships-healthy-arguments',
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS.label,
          icon: mediaMapping?.['RELATIONSHIPS.HEALTHY_ARGUMENTS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/healthy-arguments',
          type: ToolType.TOOL,
        },
      },
    },
    AMBIENT_SOUNDS: {
      id: 'ambient-sounds',
      label: toolsTranslationKeys.AMBIENT_SOUNDS.label,
      icon: mediaMapping?.['AMBIENT_SOUNDS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/ambient-sounds',
      type: ToolType.TOOL,
    },
    MINDFULNESS: {
      id: 'mindfulness',
      label: toolsTranslationKeys.MINDFULNESS.label,
      icon: mediaMapping?.['MINDFULNESS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/mindfulness',
      type: ToolType.CATEGORY,
      subcategories: {
        CONSCIOUS_BREATHING: {
          id: 'mindfulness-conscious-breathing',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.label,
          icon: mediaMapping?.['MINDFULNESS.CONSCIOUS_BREATHING.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/conscious-breathing',
          type: ToolType.TOOL,
        },
        MINDFUL_WALKING: {
          id: 'mindfulness-mindful-walking',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.label,
          icon: mediaMapping?.['MINDFULNESS.MINDFUL_WALKING.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/mindful-walking',
          type: ToolType.TOOL,
        },
        EMOTIONAL_DISCOMFORT: {
          id: 'mindfulness-emotional-discomfort',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.label,
          icon: mediaMapping?.['MINDFULNESS.EMOTIONAL_DISCOMFORT.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/emotional-discomfort',
          type: ToolType.TOOL,
        },
        SENSE_AWARENESS: {
          id: 'mindfulness-sense-awareness',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.label,
          icon: mediaMapping?.['MINDFULNESS.SENSE_AWARENESS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/sense-awareness',
          type: ToolType.TOOL,
        },
        LOVING_KINDNESS: {
          id: 'mindfulness-loving-kindness',
          label: toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.label,
          icon: mediaMapping?.['MINDFULNESS.LOVING_KINDNESS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/loving-kindness',
          type: ToolType.TOOL,
        },
      },
    },
    PAUSE: {
      id: 'pause',
      label: toolsTranslationKeys.PAUSE.label,
      icon: mediaMapping?.['PAUSE.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/pause',
      type: ToolType.TOOL,
    },
    MY_FEELINGS: {
      id: 'my-feelings',
      label: toolsTranslationKeys.MY_FEELINGS.label,
      icon: mediaMapping?.['MY_FEELINGS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/my-feelings',
      type: ToolType.TOOL,
    },
    SLEEP: {
      id: 'sleep',
      label: toolsTranslationKeys.SLEEP.label,
      icon: mediaMapping?.['SLEEP.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/sleep',
      type: ToolType.CATEGORY,
      subcategories: {
        SLEEP_HELP: {
          id: 'sleep-help',
          label: toolsTranslationKeys.SLEEP.subcategories.SLEEP_HELP.label,
          icon: mediaMapping?.['SLEEP.SLEEP_HELP.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/sleep/sleep-help',
          type: ToolType.TOOL,
        },
        SLEEP_HABITS: {
          id: 'sleep-habits',
          label: toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.label,
          icon: mediaMapping?.['SLEEP.SLEEP_HABITS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/sleep/sleep-habits',
          type: ToolType.TOOL,
        },

        SLEEP_PERSPECTIVE: {
          id: 'sleep-perspective',
          label: toolsTranslationKeys.SLEEP.subcategories.SLEEP_PERSPECTIVE.label,
          icon: mediaMapping?.['SLEEP.SLEEP_PERSPECTIVE.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/sleep/sleep-perspective',
          type: ToolType.TOOL,
        },
      },
    },
    WORRY_TIME: {
      id: 'worry-time',
      label: toolsTranslationKeys.WORRY_TIME.label,
      icon: mediaMapping?.['WORRY_TIME.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/worry-time',
      type: ToolType.TOOL,
    },
    RID: {
      id: 'rid',
      label: toolsTranslationKeys.RID.label,
      icon: mediaMapping?.['RID.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/rid',
      type: ToolType.TOOL,
    },
    MY_STRENGTHS: {
      id: 'my-strengths',
      label: toolsTranslationKeys.MY_STRENGTHS.label,
      icon: mediaMapping?.['MY_STRENGTHS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/my-strengths',
      type: ToolType.TOOL,
    },
    SHIFT_THOUGHTS: {
      id: 'shift-thoughts',
      label: toolsTranslationKeys.SHIFT_THOUGHTS.label,
      icon: mediaMapping?.['SHIFT_THOUGHTS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/shift-thoughts',
      type: ToolType.TOOL,
    },
    RECREATIONAL_ACTIVITIES: {
      id: 'recreational-activities',
      label: toolsTranslationKeys.RECREATIONAL_ACTIVITIES.label,
      icon: mediaMapping?.['RECREATIONAL_ACTIVITIES.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/recreational-activities',
      type: ToolType.CATEGORY,
      subcategories: {
        RECREATIONAL_ACTIVITIES_ALONE: {
          id: 'recreational-activities-alone',
          label: toolsTranslationKeys.RECREATIONAL_ACTIVITIES.subcategories.RECREATIONAL_ACTIVITIES_ALONE.label,
          icon: mediaMapping?.['RECREATIONAL_ACTIVITIES.RECREATIONAL_ACTIVITIES_ALONE.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/recreational-activities/alone',
          type: ToolType.TOOL,
        },
        RECREATIONAL_ACTIVITIES_CITY: {
          id: 'recreational-activities-city',
          label: toolsTranslationKeys.RECREATIONAL_ACTIVITIES.subcategories.RECREATIONAL_ACTIVITIES_CITY.label,
          icon: mediaMapping?.['RECREATIONAL_ACTIVITIES.RECREATIONAL_ACTIVITIES_CITY.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/recreational-activities/city',
          type: ToolType.TOOL,
        },
        RECREATIONAL_ACTIVITIES_NATURE: {
          id: 'recreational-activities-nature',
          label: toolsTranslationKeys.RECREATIONAL_ACTIVITIES.subcategories.RECREATIONAL_ACTIVITIES_NATURE.label,
          icon: mediaMapping?.['RECREATIONAL_ACTIVITIES.RECREATIONAL_ACTIVITIES_NATURE.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/recreational-activities/nature',
          type: ToolType.TOOL,
        },
      },
    },
  };

  return TOOLS_CONFIG;
};
