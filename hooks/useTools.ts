import { Href } from 'expo-router';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

const DUMMY_PHOTO = require('@/assets/images/old-couple.png');

enum ToolType {
  CATEGORY = 'category',
  TOOL = 'tool',
}

enum ToolIds {
  RELATIONSHIPS = 'RELATIONSHIPS',
  AMBIENT_SOUNDS = 'AMBIENT_SOUNDS',
  MINDFULNESS = 'MINDFULNESS',
  PAUSE = 'PAUSE',
  MY_FEELINGS = 'MY_FEELINGS',
  SLEEP = 'SLEEP',
  WORRY_TIME = 'WORRY_TIME',
  RID = 'RID',
  SOOTHE_SENSES = 'SOOTHE_SENSES',
  CONNECT_WITH_OTHERS = 'CONNECT_WITH_OTHERS',
  CHANGE_PERSPECTIVE = 'CHANGE_PERSPECTIVE',
  GROUNDING = 'GROUNDING',
  QUOTES = 'QUOTES',
  RECREATIONAL_ACTIVITIES = 'RECREATIONAL_ACTIVITIES',
  MY_STRENGTHS = 'MY_STRENGTHS',
  SHIFT_THOUGHTS = 'SHIFT_THOUGHTS',
}

enum ToolSubcategoriesIds {
  RECONNECT_WITH_PARTNER = 'RECONNECT_WITH_PARTNER',
  POSITIVE_COMMUNICATION = 'POSITIVE_COMMUNICATION',
  I_MESSAGES = 'I_MESSAGES',
  HEALTHY_ARGUMENTS = 'HEALTHY_ARGUMENTS',
  CONSCIOUS_BREATHING = 'CONSCIOUS_BREATHING',
  MINDFUL_WALKING = 'MINDFUL_WALKING',
  EMOTIONAL_DISCOMFORT = 'EMOTIONAL_DISCOMFORT',
  SENSE_AWARENESS = 'SENSE_AWARENESS',
  LOVING_KINDNESS = 'LOVING_KINDNESS',
  SLEEP_HELP = 'SLEEP_HELP',
  SLEEP_HABITS = 'SLEEP_HABITS',
  SLEEP_PERSPECTIVE = 'SLEEP_PERSPECTIVE',
  RECREATIONAL_ACTIVITIES_ALONE = 'RECREATIONAL_ACTIVITIES_ALONE',
  RECREATIONAL_ACTIVITIES_CITY = 'RECREATIONAL_ACTIVITIES_CITY',
  RECREATIONAL_ACTIVITIES_NATURE = 'RECREATIONAL_ACTIVITIES_NATURE',
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
  toolIds: (ToolIds | ToolSubcategoriesIds)[];
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
  const TOOL_CONFIG = useTools();

  const SYMPOTOMS_CONFIG: SymptomsConfigType = {
    REMINDED_OF_TRAUMA: {
      id: SymptomIds.REMINDED_OF_TRAUMA,
      label: symptomsTranslationKeys.REMINDED_OF_TRAUMA.label,
      icon: mediaMapping?.['REMINDED_OF_TRAUMA.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.AMBIENT_SOUNDS,
        ToolIds.CHANGE_PERSPECTIVE,
        ToolIds.GROUNDING,
        ToolIds.RID,
        ToolIds.SOOTHE_SENSES,
        ToolIds.QUOTES,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_ALONE,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_CITY,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_NATURE,
        ToolSubcategoriesIds.CONSCIOUS_BREATHING,
        ToolSubcategoriesIds.MINDFUL_WALKING,
        ToolSubcategoriesIds.EMOTIONAL_DISCOMFORT,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
    AVOIDING_TRIGGERS: {
      id: SymptomIds.AVOIDING_TRIGGERS,
      label: symptomsTranslationKeys.AVOIDING_TRIGGERS.label,
      icon: mediaMapping?.['AVOIDING_TRIGGERS.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.AMBIENT_SOUNDS,
        ToolIds.CHANGE_PERSPECTIVE,
        ToolIds.QUOTES,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.CONSCIOUS_BREATHING,
        ToolSubcategoriesIds.MINDFUL_WALKING,
        ToolSubcategoriesIds.EMOTIONAL_DISCOMFORT,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
    DISCONNECTED_FROM_PEOPLE: {
      id: SymptomIds.DISCONNECTED_FROM_PEOPLE,
      label: symptomsTranslationKeys.DISCONNECTED_FROM_PEOPLE.label,
      icon: mediaMapping?.['DISCONNECTED_FROM_PEOPLE.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.CHANGE_PERSPECTIVE,
        ToolIds.CONNECT_WITH_OTHERS,
        ToolIds.QUOTES,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.POSITIVE_COMMUNICATION,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
    DISCONNECTED_FROM_REALITY: {
      id: SymptomIds.DISCONNECTED_FROM_REALITY,
      label: symptomsTranslationKeys.DISCONNECTED_FROM_REALITY.label,
      icon: mediaMapping?.['DISCONNECTED_FROM_REALITY.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.AMBIENT_SOUNDS,
        ToolIds.CHANGE_PERSPECTIVE,
        ToolIds.GROUNDING,
        ToolIds.QUOTES,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.I_MESSAGES,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.HEALTHY_ARGUMENTS,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
    SAD_HOPELESS: {
      id: SymptomIds.SAD_HOPELESS,
      label: symptomsTranslationKeys.SAD_HOPELESS.label,
      icon: mediaMapping?.['SAD_HOPELESS.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.CHANGE_PERSPECTIVE,
        ToolIds.CONNECT_WITH_OTHERS,
        ToolIds.SOOTHE_SENSES,
        ToolIds.QUOTES,
        ToolIds.MY_STRENGTHS,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_ALONE,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_CITY,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_NATURE,
        ToolSubcategoriesIds.CONSCIOUS_BREATHING,
        ToolSubcategoriesIds.MINDFUL_WALKING,
        ToolSubcategoriesIds.EMOTIONAL_DISCOMFORT,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
    WORRIED_ANXIOUS: {
      id: SymptomIds.WORRIED_ANXIOUS,
      label: symptomsTranslationKeys.WORRIED_ANXIOUS.label,
      icon: mediaMapping?.['WORRIED_ANXIOUS.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.AMBIENT_SOUNDS,
        ToolIds.CHANGE_PERSPECTIVE,
        ToolIds.CONNECT_WITH_OTHERS,
        ToolIds.GROUNDING,
        ToolIds.SOOTHE_SENSES,
        ToolIds.QUOTES,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_ALONE,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_CITY,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_NATURE,
        ToolSubcategoriesIds.CONSCIOUS_BREATHING,
        ToolSubcategoriesIds.MINDFUL_WALKING,
        ToolSubcategoriesIds.EMOTIONAL_DISCOMFORT,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
    ANGRY: {
      id: SymptomIds.ANGRY,
      label: symptomsTranslationKeys.ANGRY.label,
      icon: mediaMapping?.['ANGRY.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.AMBIENT_SOUNDS,
        ToolIds.CHANGE_PERSPECTIVE,
        ToolIds.SOOTHE_SENSES,
        ToolIds.SHIFT_THOUGHTS,
        ToolIds.PAUSE,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_ALONE,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_CITY,
        ToolSubcategoriesIds.RECREATIONAL_ACTIVITIES_NATURE,
        ToolSubcategoriesIds.CONSCIOUS_BREATHING,
        ToolSubcategoriesIds.MINDFUL_WALKING,
        ToolSubcategoriesIds.EMOTIONAL_DISCOMFORT,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
    SLEEP_PROBLEMS: {
      id: SymptomIds.SLEEP_PROBLEMS,
      label: symptomsTranslationKeys.SLEEP_PROBLEMS.label,
      icon: mediaMapping?.['SLEEP_PROBLEMS.CATEGORY_ICON'] || DUMMY_PHOTO,
      toolIds: [
        ToolIds.AMBIENT_SOUNDS,
        ToolIds.GROUNDING,
        ToolIds.QUOTES,
        ToolIds.WORRY_TIME,
        ToolIds.MY_FEELINGS,
        ToolSubcategoriesIds.RECONNECT_WITH_PARTNER,
        ToolSubcategoriesIds.SLEEP_HELP,
        ToolSubcategoriesIds.SLEEP_HABITS,
        ToolSubcategoriesIds.SLEEP_PERSPECTIVE,
        ToolSubcategoriesIds.SENSE_AWARENESS,
        ToolSubcategoriesIds.LOVING_KINDNESS,
      ],
    },
  };

  const getRandomToolForSymptom = (symptom: SymptomType) => {
    const randomToolId = symptom.toolIds[Math.floor(Math.random() * symptom.toolIds.length)];

    // if this is not a subcategory of a tool:
    if (randomToolId in TOOL_CONFIG) {
      return TOOL_CONFIG[randomToolId];
    } else {
      // if this is a subcategory, find the tool and start it
      for (const mainTool of Object.values(TOOL_CONFIG)) {
        if (mainTool.subcategories) {
          const subcategoryTool = Object.values(mainTool.subcategories).find((sub) => sub.id === randomToolId);
          if (subcategoryTool) {
            return subcategoryTool;
          }
        } else {
          console.log('TOOL NOT FOUND ⛔️');
        }
      }
    }
  };

  return { SYMPOTOMS_CONFIG, getRandomToolForSymptom };
};
