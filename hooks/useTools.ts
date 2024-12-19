import { Href } from 'expo-router';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

const DUMMY_PHOTO = require('@/assets/images/old-couple.png');

enum ToolType {
  CATEGORY = 'category',
  TOOL = 'tool',
}

enum ToolIds {
  RELATIONSHIPS = 'relationships',
  AMBIENT_SOUNDS = 'ambient-sounds',
  MINDFULNESS = 'mindfulness',
  PAUSE = 'pause',
  MY_FEELINGS = 'my-feelings',
  SLEEP = 'sleep',
  WORRY_TIME = 'worry-time',
  RID = 'rid',
  SOOTHE_SENSES = 'soothe-senses',
  CONNECT_WITH_OTHERS = 'connect-with-others',
  CHANGE_PERSPECTIVE = 'change-perspective',
  GROUNDING = 'grounding',
  QUOTES = 'quotes',
  RECREATIONAL_ACTIVITIES = 'recreational-activities',
  MY_STRENGTHS = 'my-strengths',
  SHIFT_THOUGHTS = 'shift-thoughts',
  OBSERVE_THOUGHTS = 'observe-thoughts',
  POSTIVE_IMAGERY = 'postive-imagery',
  BODY_SCAN = 'body-scan',
  MUSCLE_RELAXATION = 'muscle-relaxation',
  DEEP_BREATHING = 'deep-breathing',
}

enum ToolSubcategoriesIds {
  RECONNECT_WITH_PARTNER = 'relationships-reconnect-with-partner',
  POSITIVE_COMMUNICATION = 'relationships-positive-communication',
  I_MESSAGES = 'relationships-i-messages',
  HEALTHY_ARGUMENTS = 'relationships-healthy-arguments',
  CONSCIOUS_BREATHING = 'mindfulness-conscious-breathing',
  MINDFUL_WALKING = 'mindfulness-mindful-walking',
  EMOTIONAL_DISCOMFORT = 'mindfulness-emotional-discomfort',
  SENSE_AWARENESS = 'mindfulness-sense-awareness',
  LOVING_KINDNESS = 'mindfulness-loving-kindness',
  SLEEP_HELP = 'sleep-help',
  SLEEP_HABITS = 'sleep-habits',
  SLEEP_PERSPECTIVE = 'sleep-perspective',
  RECREATIONAL_ACTIVITIES_ALONE = 'recreational-activities-alone',
  RECREATIONAL_ACTIVITIES_CITY = 'recreational-activities-city',
  RECREATIONAL_ACTIVITIES_NATURE = 'recreational-activities-nature',
  CLOUDS = 'clouds',
  RIVER = 'river',
  BEACH = 'beach',
  COUNTRY_ROAD = 'country-road',
  FOREST = 'forest',
  JULIA = 'julia',
  ROBYN = 'robyn',
}

enum SymptomIds {
  REMINDED_OF_TRAUMA = 'REMINDED_OF_TRAUMA',
  AVOIDING_TRIGGERS = 'AVOIDING_TRIGGERS',
  DISCONNECTED_FROM_PEOPLE = 'DISCONNECTED_FROM_PEOPLE',
  DISCONNECTED_FROM_REALITY = 'DISCONNECTED_FROM_REALITY',
  SAD_HOPELESS = 'SAD_HOPELESS',
  WORRIED_ANXIOUS = 'WORRIED_ANXIOUS',
  ANGRY = 'ANGRY',
  SLEEP_PROBLEMS = 'SLEEP_PROBLEMS',
}

export type Tool = {
  id: ToolIds | ToolSubcategoriesIds;
  label: string;
  icon: string;
  route: Href;
  type: ToolType;
  subcategories?: Partial<Record<ToolSubcategories, Tool>>;
};

export type SymptomType = {
  id: SymptomIds;
  label: string;
  icon: string;
  tools: Tool[];
};

export type ToolConfigType = Record<ToolCategories, Tool>;
export type SymptomsConfigType = Record<Symptoms, SymptomType>;

type ToolCategories =
  | 'RELATIONSHIPS'
  | 'AMBIENT_SOUNDS'
  | 'MINDFULNESS'
  | 'PAUSE'
  | 'MY_FEELINGS'
  | 'WORRY_TIME'
  | 'RID'
  | 'MUSCLE_RELAXATION'
  | 'DEEP_BREATHING'
  | 'BODY_SCAN'
  | 'POSTIVE_IMAGERY'
  | 'OBSERVE_THOUGHTS'
  | 'SOOTHE_SENSES'
  | 'CONNECT_WITH_OTHERS'
  | 'CHANGE_PERSPECTIVE'
  | 'GROUNDING'
  | 'QUOTES'
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
  | 'JULIA'
  | 'ROBYN'
  | 'BEACH'
  | 'COUNTRY_ROAD'
  | 'FOREST'
  | 'CLOUDS'
  | 'RIVER'
  | 'RECREATIONAL_ACTIVITIES_ALONE'
  | 'RECREATIONAL_ACTIVITIES_CITY'
  | 'RECREATIONAL_ACTIVITIES_NATURE';

type Symptoms =
  | 'REMINDED_OF_TRAUMA'
  | 'AVOIDING_TRIGGERS'
  | 'DISCONNECTED_FROM_PEOPLE'
  | 'DISCONNECTED_FROM_REALITY'
  | 'SAD_HOPELESS'
  | 'WORRIED_ANXIOUS'
  | 'ANGRY'
  | 'SLEEP_PROBLEMS';

export const useTools = () => {
  const { mediaMapping } = useAssetsManagerContext();
  const { toolsTranslationKeys } = useTranslationKeys();
  const TOOLS_CONFIG: ToolConfigType = {
    OBSERVE_THOUGHTS: {
      id: ToolIds.OBSERVE_THOUGHTS,
      label: toolsTranslationKeys.OBSERVE_THOUGHTS.label,
      icon: mediaMapping?.['OBSERVE_THOUGHTS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/observe-thoughts',
      type: ToolType.CATEGORY,
      subcategories: {
        CLOUDS: {
          id: ToolSubcategoriesIds.CLOUDS,
          label: toolsTranslationKeys.OBSERVE_THOUGHTS.subcategories.CLOUDS.label,
          icon: mediaMapping?.['OBSERVE_THOUGHTS.CLOUDS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/observe-thoughts/clouds',
          type: ToolType.TOOL,
        },
        RIVER: {
          id: ToolSubcategoriesIds.RIVER,
          label: toolsTranslationKeys.OBSERVE_THOUGHTS.subcategories.RIVER.label,
          icon: mediaMapping?.['OBSERVE_THOUGHTS.RIVER.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/observe-thoughts/river',
          type: ToolType.TOOL,
        },
      },
    },
    POSTIVE_IMAGERY: {
      id: ToolIds.POSTIVE_IMAGERY,
      label: toolsTranslationKeys.POSTIVE_IMAGERY.label,
      icon: mediaMapping?.['POSTIVE_IMAGERY.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/positive-imagery',
      type: ToolType.CATEGORY,
      subcategories: {
        BEACH: {
          id: ToolSubcategoriesIds.BEACH,
          label: toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.BEACH.label,
          icon: mediaMapping?.['POSTIVE_IMAGERY.BEACH.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/positive-imagery/beach',
          type: ToolType.TOOL,
        },
        COUNTRY_ROAD: {
          id: ToolSubcategoriesIds.COUNTRY_ROAD,
          label: toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.COUNTRY_ROAD.label,
          icon: mediaMapping?.['POSTIVE_IMAGERY.COUNTRY_ROAD.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/positive-imagery/country-road',
          type: ToolType.TOOL,
        },
        FOREST: {
          id: ToolSubcategoriesIds.FOREST,
          label: toolsTranslationKeys.POSTIVE_IMAGERY.subcategories.FOREST.label,
          icon: mediaMapping?.['POSTIVE_IMAGERY.FOREST.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/positive-imagery/forest',
          type: ToolType.TOOL,
        },
      },
    },
    BODY_SCAN: {
      id: ToolIds.BODY_SCAN,
      label: toolsTranslationKeys.BODY_SCAN.label,
      icon: mediaMapping?.['BODY_SCAN.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/body-scan',
      type: ToolType.CATEGORY,
      subcategories: {
        JULIA: {
          id: ToolSubcategoriesIds.JULIA,
          label: toolsTranslationKeys.BODY_SCAN.subcategories.JULIA.label,
          icon: mediaMapping?.['BODY_SCAN.JULIA.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/body-scan/julia',
          type: ToolType.TOOL,
        },
        ROBYN: {
          id: ToolSubcategoriesIds.ROBYN,
          label: toolsTranslationKeys.BODY_SCAN.subcategories.ROBYN.label,
          icon: mediaMapping?.['BODY_SCAN.ROBYN.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/body-scan/robyn',
          type: ToolType.TOOL,
        },
      },
    },
    MUSCLE_RELAXATION: {
      id: ToolIds.MUSCLE_RELAXATION,
      label: toolsTranslationKeys.MUSCLE_RELAXATION.label,
      icon: mediaMapping?.['MUSCLE_RELAXATION.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/muscle-relaxation',
      type: ToolType.TOOL,
    },
    DEEP_BREATHING: {
      id: ToolIds.DEEP_BREATHING,
      label: toolsTranslationKeys.DEEP_BREATHING.label,
      icon: mediaMapping?.['DEEP_BREATHING.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/deep-breathing',
      type: ToolType.TOOL,
    },
    RELATIONSHIPS: {
      id: ToolIds.RELATIONSHIPS,
      label: toolsTranslationKeys.RELATIONSHIPS.label,
      icon: mediaMapping?.['RELATIONSHIPS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/relationships',
      type: ToolType.CATEGORY,
      subcategories: {
        RECONNECT_WITH_PARTNER: {
          id: ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.RECONNECT_WITH_PARTNER.label,
          icon: mediaMapping?.['RELATIONSHIPS.RECONNECT_WITH_PARTNER.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/reconnect-with-partner',
          type: ToolType.TOOL,
        },
        POSITIVE_COMMUNICATION: {
          id: ToolSubcategoriesIds.POSITIVE_COMMUNICATION,
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.POSITIVE_COMMUNICATION.label,
          icon: mediaMapping?.['RELATIONSHIPS.POSITIVE_COMMUNICATION.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/positive-communication',
          type: ToolType.TOOL,
        },
        I_MESSAGES: {
          id: ToolSubcategoriesIds.I_MESSAGES,
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.label,
          icon: mediaMapping?.['RELATIONSHIPS.I_MESSAGES.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/iMessages',
          type: ToolType.TOOL,
        },
        HEALTHY_ARGUMENTS: {
          id: ToolSubcategoriesIds.HEALTHY_ARGUMENTS,
          label: toolsTranslationKeys.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS.label,
          icon: mediaMapping?.['RELATIONSHIPS.HEALTHY_ARGUMENTS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/relationships/healthy-arguments',
          type: ToolType.TOOL,
        },
      },
    },
    AMBIENT_SOUNDS: {
      id: ToolIds.AMBIENT_SOUNDS,
      label: toolsTranslationKeys.AMBIENT_SOUNDS.label,
      icon: mediaMapping?.['AMBIENT_SOUNDS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/ambient-sounds',
      type: ToolType.TOOL,
    },
    MINDFULNESS: {
      id: ToolIds.MINDFULNESS,
      label: toolsTranslationKeys.MINDFULNESS.label,
      icon: mediaMapping?.['MINDFULNESS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/mindfulness',
      type: ToolType.CATEGORY,
      subcategories: {
        CONSCIOUS_BREATHING: {
          id: ToolSubcategoriesIds.CONSCIOUS_BREATHING,
          label: toolsTranslationKeys.MINDFULNESS.subcategories.CONSCIOUS_BREATHING.label,
          icon: mediaMapping?.['MINDFULNESS.CONSCIOUS_BREATHING.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/conscious-breathing',
          type: ToolType.TOOL,
        },
        MINDFUL_WALKING: {
          id: ToolSubcategoriesIds.MINDFUL_WALKING,
          label: toolsTranslationKeys.MINDFULNESS.subcategories.MINDFUL_WALKING.label,
          icon: mediaMapping?.['MINDFULNESS.MINDFUL_WALKING.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/mindful-walking',
          type: ToolType.TOOL,
        },
        EMOTIONAL_DISCOMFORT: {
          id: ToolSubcategoriesIds.EMOTIONAL_DISCOMFORT,
          label: toolsTranslationKeys.MINDFULNESS.subcategories.EMOTIONAL_DISCOMFORT.label,
          icon: mediaMapping?.['MINDFULNESS.EMOTIONAL_DISCOMFORT.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/emotional-discomfort',
          type: ToolType.TOOL,
        },
        SENSE_AWARENESS: {
          id: ToolSubcategoriesIds.SENSE_AWARENESS,
          label: toolsTranslationKeys.MINDFULNESS.subcategories.SENSE_AWARENESS.label,
          icon: mediaMapping?.['MINDFULNESS.SENSE_AWARENESS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/sense-awareness',
          type: ToolType.TOOL,
        },
        LOVING_KINDNESS: {
          id: ToolSubcategoriesIds.LOVING_KINDNESS,
          label: toolsTranslationKeys.MINDFULNESS.subcategories.LOVING_KINDNESS.label,
          icon: mediaMapping?.['MINDFULNESS.LOVING_KINDNESS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/mindfulness/loving-kindness',
          type: ToolType.TOOL,
        },
      },
    },
    PAUSE: {
      id: ToolIds.PAUSE,
      label: toolsTranslationKeys.PAUSE.label,
      icon: mediaMapping?.['PAUSE.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/pause',
      type: ToolType.TOOL,
    },
    MY_FEELINGS: {
      id: ToolIds.MY_FEELINGS,
      label: toolsTranslationKeys.MY_FEELINGS.label,
      icon: mediaMapping?.['MY_FEELINGS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/my-feelings',
      type: ToolType.TOOL,
    },
    SLEEP: {
      id: ToolIds.SLEEP,
      label: toolsTranslationKeys.SLEEP.label,
      icon: mediaMapping?.['SLEEP.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/sleep',
      type: ToolType.CATEGORY,
      subcategories: {
        SLEEP_HELP: {
          id: ToolSubcategoriesIds.SLEEP_HELP,
          label: toolsTranslationKeys.SLEEP.subcategories.SLEEP_HELP.label,
          icon: mediaMapping?.['SLEEP.SLEEP_HELP.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/sleep/sleep-help',
          type: ToolType.TOOL,
        },
        SLEEP_HABITS: {
          id: ToolSubcategoriesIds.SLEEP_HABITS,
          label: toolsTranslationKeys.SLEEP.subcategories.SLEEP_HABITS.label,
          icon: mediaMapping?.['SLEEP.SLEEP_HABITS.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/sleep/sleep-habits',
          type: ToolType.TOOL,
        },

        SLEEP_PERSPECTIVE: {
          id: ToolSubcategoriesIds.SLEEP_PERSPECTIVE,
          label: toolsTranslationKeys.SLEEP.subcategories.SLEEP_PERSPECTIVE.label,
          icon: mediaMapping?.['SLEEP.SLEEP_PERSPECTIVE.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/sleep/sleep-perspective',
          type: ToolType.TOOL,
        },
      },
    },
    WORRY_TIME: {
      id: ToolIds.WORRY_TIME,
      label: toolsTranslationKeys.WORRY_TIME.label,
      icon: mediaMapping?.['WORRY_TIME.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/worry-time',
      type: ToolType.TOOL,
    },
    RID: {
      id: ToolIds.RID,
      label: toolsTranslationKeys.RID.label,
      icon: mediaMapping?.['RID.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/rid',
      type: ToolType.TOOL,
    },
    SOOTHE_SENSES: {
      id: ToolIds.SOOTHE_SENSES,
      label: toolsTranslationKeys.SOOTHE_SENSES.label,
      icon: mediaMapping?.['SOOTHE_SENSES.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/soothe-senses',
      type: ToolType.TOOL,
    },
    CONNECT_WITH_OTHERS: {
      id: ToolIds.CONNECT_WITH_OTHERS,
      label: toolsTranslationKeys.CONNECT_WITH_OTHERS.label,
      icon: mediaMapping?.['CONNECT_WITH_OTHERS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/connect-with-others',
      type: ToolType.TOOL,
    },
    CHANGE_PERSPECTIVE: {
      id: ToolIds.CHANGE_PERSPECTIVE,
      label: toolsTranslationKeys.CHANGE_PERSPECTIVE.label,
      icon: mediaMapping?.['CHANGE_PERSPECTIVE.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/change-perspective',
      type: ToolType.TOOL,
    },
    GROUNDING: {
      id: ToolIds.GROUNDING,
      label: toolsTranslationKeys.GROUNDING.label,
      icon: mediaMapping?.['GROUNDING.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/grounding',
      type: ToolType.TOOL,
    },
    QUOTES: {
      id: ToolIds.QUOTES,
      label: toolsTranslationKeys.QUOTES.label,
      icon: mediaMapping?.['QUOTES.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/quotes',
      type: ToolType.TOOL,
    },
    MY_STRENGTHS: {
      id: ToolIds.MY_STRENGTHS,
      label: toolsTranslationKeys.MY_STRENGTHS.label,
      icon: mediaMapping?.['MY_STRENGTHS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/my-strengths',
      type: ToolType.TOOL,
    },
    SHIFT_THOUGHTS: {
      id: ToolIds.SHIFT_THOUGHTS,
      label: toolsTranslationKeys.SHIFT_THOUGHTS.label,
      icon: mediaMapping?.['SHIFT_THOUGHTS.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/shift-thoughts',
      type: ToolType.TOOL,
    },
    RECREATIONAL_ACTIVITIES: {
      id: ToolIds.RECREATIONAL_ACTIVITIES,
      label: toolsTranslationKeys.RECREATIONAL_ACTIVITIES.label,
      icon: mediaMapping?.['RECREATIONAL_ACTIVITIES.CATEGORY_ICON'] || DUMMY_PHOTO,
      route: '/tools/recreational-activities',
      type: ToolType.CATEGORY,
      subcategories: {
        RECREATIONAL_ACTIVITIES_ALONE: {
          id: ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_ALONE,
          label: toolsTranslationKeys.RECREATIONAL_ACTIVITIES.subcategories.RECREATIONAL_ACTIVITIES_ALONE.label,
          icon: mediaMapping?.['RECREATIONAL_ACTIVITIES.RECREATIONAL_ACTIVITIES_ALONE.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/recreational-activities/alone',
          type: ToolType.TOOL,
        },
        RECREATIONAL_ACTIVITIES_CITY: {
          id: ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_CITY,
          label: toolsTranslationKeys.RECREATIONAL_ACTIVITIES.subcategories.RECREATIONAL_ACTIVITIES_CITY.label,
          icon: mediaMapping?.['RECREATIONAL_ACTIVITIES.RECREATIONAL_ACTIVITIES_CITY.CATEGORY_ICON'] || DUMMY_PHOTO,
          route: '/tools/recreational-activities/city',
          type: ToolType.TOOL,
        },
        RECREATIONAL_ACTIVITIES_NATURE: {
          id: ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_NATURE,
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

export const useSymptoms = () => {
  const { symptomsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();
  const TOOLS_CONFIG = useTools();

  const SYMPOTOMS_CONFIG: SymptomsConfigType = {
    REMINDED_OF_TRAUMA: {
      id: SymptomIds.REMINDED_OF_TRAUMA,
      label: symptomsTranslationKeys.REMINDED_OF_TRAUMA.label,
      icon: mediaMapping?.['REMINDED_OF_TRAUMA.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.AMBIENT_SOUNDS,
        TOOLS_CONFIG.CHANGE_PERSPECTIVE,
        TOOLS_CONFIG.GROUNDING,
        TOOLS_CONFIG.RID,
        TOOLS_CONFIG.SOOTHE_SENSES,
        TOOLS_CONFIG.QUOTES,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_ALONE!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_CITY!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_NATURE!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.CONSCIOUS_BREATHING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.MINDFUL_WALKING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.EMOTIONAL_DISCOMFORT!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
        TOOLS_CONFIG.DEEP_BREATHING,
        TOOLS_CONFIG.MUSCLE_RELAXATION,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.BEACH!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.COUNTRY_ROAD!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.FOREST!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.JULIA!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.ROBYN!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.CLOUDS!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.RIVER!,
      ],
    },
    AVOIDING_TRIGGERS: {
      id: SymptomIds.AVOIDING_TRIGGERS,
      label: symptomsTranslationKeys.AVOIDING_TRIGGERS.label,
      icon: mediaMapping?.['AVOIDING_TRIGGERS.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.AMBIENT_SOUNDS,
        TOOLS_CONFIG.CHANGE_PERSPECTIVE,
        TOOLS_CONFIG.QUOTES,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.CONSCIOUS_BREATHING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.MINDFUL_WALKING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.EMOTIONAL_DISCOMFORT!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
        TOOLS_CONFIG.DEEP_BREATHING,
        TOOLS_CONFIG.MUSCLE_RELAXATION,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.BEACH!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.COUNTRY_ROAD!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.FOREST!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.JULIA!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.ROBYN!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.CLOUDS!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.RIVER!,
      ],
    },
    DISCONNECTED_FROM_PEOPLE: {
      id: SymptomIds.DISCONNECTED_FROM_PEOPLE,
      label: symptomsTranslationKeys.DISCONNECTED_FROM_PEOPLE.label,
      icon: mediaMapping?.['DISCONNECTED_FROM_PEOPLE.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.CHANGE_PERSPECTIVE,
        TOOLS_CONFIG.CONNECT_WITH_OTHERS,
        TOOLS_CONFIG.QUOTES,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.POSITIVE_COMMUNICATION!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
      ],
    },
    DISCONNECTED_FROM_REALITY: {
      id: SymptomIds.DISCONNECTED_FROM_REALITY,
      label: symptomsTranslationKeys.DISCONNECTED_FROM_REALITY.label,
      icon: mediaMapping?.['DISCONNECTED_FROM_REALITY.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.AMBIENT_SOUNDS,
        TOOLS_CONFIG.CHANGE_PERSPECTIVE,
        TOOLS_CONFIG.GROUNDING,
        TOOLS_CONFIG.QUOTES,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.I_MESSAGES!,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.HEALTHY_ARGUMENTS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
        TOOLS_CONFIG.DEEP_BREATHING,
        TOOLS_CONFIG.MUSCLE_RELAXATION,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.BEACH!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.COUNTRY_ROAD!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.FOREST!,
      ],
    },
    SAD_HOPELESS: {
      id: SymptomIds.SAD_HOPELESS,
      label: symptomsTranslationKeys.SAD_HOPELESS.label,
      icon: mediaMapping?.['SAD_HOPELESS.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.CHANGE_PERSPECTIVE,
        TOOLS_CONFIG.CONNECT_WITH_OTHERS,
        TOOLS_CONFIG.SOOTHE_SENSES,
        TOOLS_CONFIG.QUOTES,
        TOOLS_CONFIG.MY_STRENGTHS,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_ALONE!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_CITY!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_NATURE!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.CONSCIOUS_BREATHING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.MINDFUL_WALKING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.EMOTIONAL_DISCOMFORT!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.JULIA!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.ROBYN!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.CLOUDS!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.RIVER!,
      ],
    },
    WORRIED_ANXIOUS: {
      id: SymptomIds.WORRIED_ANXIOUS,
      label: symptomsTranslationKeys.WORRIED_ANXIOUS.label,
      icon: mediaMapping?.['WORRIED_ANXIOUS.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.AMBIENT_SOUNDS,
        TOOLS_CONFIG.CHANGE_PERSPECTIVE,
        TOOLS_CONFIG.CONNECT_WITH_OTHERS,
        TOOLS_CONFIG.GROUNDING,
        TOOLS_CONFIG.SOOTHE_SENSES,
        TOOLS_CONFIG.QUOTES,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_ALONE!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_CITY!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_NATURE!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.CONSCIOUS_BREATHING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.MINDFUL_WALKING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.EMOTIONAL_DISCOMFORT!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
        TOOLS_CONFIG.DEEP_BREATHING,
        TOOLS_CONFIG.MUSCLE_RELAXATION,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.BEACH!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.COUNTRY_ROAD!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.FOREST!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.JULIA!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.ROBYN!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.CLOUDS!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.RIVER!,
      ],
    },
    ANGRY: {
      id: SymptomIds.ANGRY,
      label: symptomsTranslationKeys.ANGRY.label,
      icon: mediaMapping?.['ANGRY.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.AMBIENT_SOUNDS,
        TOOLS_CONFIG.CHANGE_PERSPECTIVE,
        TOOLS_CONFIG.SOOTHE_SENSES,
        TOOLS_CONFIG.SHIFT_THOUGHTS,
        TOOLS_CONFIG.PAUSE,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_ALONE!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_CITY!,
        TOOLS_CONFIG.RECREATIONAL_ACTIVITIES.subcategories!.RECREATIONAL_ACTIVITIES_NATURE!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.CONSCIOUS_BREATHING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.MINDFUL_WALKING!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.EMOTIONAL_DISCOMFORT!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
        TOOLS_CONFIG.DEEP_BREATHING,
        TOOLS_CONFIG.MUSCLE_RELAXATION,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.BEACH!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.COUNTRY_ROAD!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.FOREST!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.JULIA!,
        TOOLS_CONFIG.BODY_SCAN.subcategories!.ROBYN!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.CLOUDS!,
        TOOLS_CONFIG.OBSERVE_THOUGHTS.subcategories!.RIVER!,
      ],
    },
    SLEEP_PROBLEMS: {
      id: SymptomIds.SLEEP_PROBLEMS,
      label: symptomsTranslationKeys.SLEEP_PROBLEMS.label,
      icon: mediaMapping?.['SLEEP_PROBLEMS.CATEGORY_ICON'] || DUMMY_PHOTO,
      tools: [
        TOOLS_CONFIG.AMBIENT_SOUNDS,
        TOOLS_CONFIG.GROUNDING,
        TOOLS_CONFIG.QUOTES,
        TOOLS_CONFIG.WORRY_TIME,
        TOOLS_CONFIG.MY_FEELINGS,
        TOOLS_CONFIG.RELATIONSHIPS.subcategories!.RECONNECT_WITH_PARTNER!,
        TOOLS_CONFIG.SLEEP.subcategories!.SLEEP_HELP!,
        TOOLS_CONFIG.SLEEP.subcategories!.SLEEP_HABITS!,
        TOOLS_CONFIG.SLEEP.subcategories!.SLEEP_PERSPECTIVE!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.SENSE_AWARENESS!,
        TOOLS_CONFIG.MINDFULNESS.subcategories!.LOVING_KINDNESS!,
        TOOLS_CONFIG.DEEP_BREATHING,
        TOOLS_CONFIG.MUSCLE_RELAXATION,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.BEACH!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.COUNTRY_ROAD!,
        TOOLS_CONFIG.POSTIVE_IMAGERY.subcategories!.FOREST!,
      ],
    },
  };

  const getRandomToolForSymptom = (symptom: SymptomType) => {
    const randomTool = symptom.tools[Math.floor(Math.random() * symptom.tools.length)];
    return randomTool;
  };

  return { SYMPOTOMS_CONFIG, getRandomToolForSymptom };
};
