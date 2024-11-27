const useTranslationKeys = () => {
  const toolsTranslationKeys = {
    RELATIONSHIPS: {
      label: 'list.relationships',
      subcategories: {
        RECONNECT_WITH_PARTNER: {
          label: 'list.reconnect-with-partner',
          helper: 'relationships.tools.reconnect-with-partner.helper',
          repeater: 'relationships.tools.reconnect-with-partner.repeater',
        },
        POSITIVE_COMMUNICATION: {
          label: 'list.positive-communication',
          helper: 'relationships.tools.positive-communication.helper',
          repeater: 'relationships.tools.positive-communication.repeater',
        },
        I_MESSAGES: {
          label: 'list.i-messages',
          title: 'relationships.tools.i-messages.title',
          findTime: 'relationships.tools.i-messages.find-time',
          text: 'relationships.tools.i-messages.text',
          when: 'relationships.tools.i-messages.when',
          feel: 'relationships.tools.i-messages.feel',
          because: 'relationships.tools.i-messages.because',
          newMessage: {
            title: 'relationships.tools.i-messages.new-message.title',
            save: 'relationships.tools.i-messages.new-message.save',
            annoyance: {
              label: 'relationships.tools.i-messages.new-message.annoyance.label',
              placeholder: 'relationships.tools.i-messages.new-message.annoyance.placeholder',
              example: 'relationships.tools.i-messages.new-message.annoyance.example',
            },
            declaration: 'relationships.tools.i-messages.new-message.declaration',
            iFeel: {
              label: 'relationships.tools.i-messages.new-message.i-feel.label',
              placeholder: 'relationships.tools.i-messages.new-message.i-feel.placeholder',
              example: 'relationships.tools.i-messages.new-message.i-feel.example',
            },
            becauseInput: {
              label: 'relationships.tools.i-messages.new-message.because-input.label',
              placeholder: 'relationships.tools.i-messages.new-message.because-input.placeholder',
              example: 'relationships.tools.i-messages.new-message.because-input.example',
            },
          },
          edit: {
            title: 'relationships.tools.i-messages.edit.title',
          },
        },
        HEALTHY_ARGUMENTS: {
          label: 'list.healthy-arguments',
          helper: 'relationships.tools.healthy-arguments.helper',
          repeater: 'relationships.tools.healthy-arguments.repeater',
        },
      },
    },
    AMBIENT_SOUNDS: {
      label: 'list.ambient-sounds',
      select: 'ambient-sounds.select',
      beach: 'ambient-sounds.beach',
      birds: 'ambient-sounds.birds',
      countryRoad: 'ambient-sounds.country-road',
      crickets: 'ambient-sounds.crickets',
      drippingWater: 'ambient-sounds.dripping-water',
      forest: 'ambient-sounds.forest',
      frogs: 'ambient-sounds.frogs',
      marsh: 'ambient-sounds.marsh',
      publicPool: 'ambient-sounds.public-pool',
      rain: 'ambient-sounds.rain',
      runningWater: 'ambient-sounds.running-water',
      streamWater: 'ambient-sounds.stream-water',
      waterfall: 'ambient-sounds.waterfall',
      wind: 'ambient-sounds.wind',
    },
    MINDFULNESS: {
      label: 'list.mindfulness',
      subcategories: {
        CONSCIOUS_BREATHING: {
          label: 'list.conscious-breathing',
          description: 'mindfulness.conscious-breathing.description',
          actionBtnLabel: 'mindfulness.conscious-breathing.action-btn-label',
        },
        MINDFUL_WALKING: {
          label: 'list.mindful-walking',
          description: 'mindfulness.mindful-walking.description',
          actionBtnLabel: 'mindfulness.mindful-walking.action-btn-label',
        },
        EMOTIONAL_DISCOMFORT: {
          label: 'list.emotional-discomfort',
          description: 'mindfulness.emotional-discomfort.description',
          actionBtnLabel: 'mindfulness.emotional-discomfort.action-btn-label',
        },
        SENSE_AWARENESS: {
          label: 'list.sense-awareness',
          description: 'mindfulness.sense-awareness.description',
          actionBtnLabel: 'mindfulness.sense-awareness.action-btn-label',
        },
        LOVING_KINDNESS: {
          label: 'list.loving-kindness',
          description: 'mindfulness.loving-kindness.description',
          actionBtnLabel: 'mindfulness.loving-kindness.action-btn-label',
        },
      },
    },
    PAUSE: {
      label: 'list.pause',
      description: 'pause.pause.description',
      actionBtnLabel: 'pause.pause.action-btn-label',
      takeBreak: 'pause.take_break',
      repeater: 'pause.repeater',
      helper: 'pause.helper',
    },
  };

  return {
    toolsTranslationKeys,
  };
};

export default useTranslationKeys;
