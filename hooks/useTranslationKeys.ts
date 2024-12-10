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
          title: 'relationships.tools.positive-communication.title',
          helper: 'relationships.tools.positive-communication.helper',
          repeater: 'relationships.tools.positive-communication.repeater',
        },
        I_MESSAGES: {
          label: 'list.i-messages',
          title: 'relationships.tools.i-messages.title',
          addMessage: 'relationships.tools.i-messages.add-message',
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
          done: 'mindfulness.conscious-breathing.done',
        },
        MINDFUL_WALKING: {
          label: 'list.mindful-walking',
          description: 'mindfulness.mindful-walking.description',
          actionBtnLabel: 'mindfulness.mindful-walking.action-btn-label',
          done: 'mindfulness.mindful-walking.done',
        },
        EMOTIONAL_DISCOMFORT: {
          label: 'list.emotional-discomfort',
          description: 'mindfulness.emotional-discomfort.description',
          actionBtnLabel: 'mindfulness.emotional-discomfort.action-btn-label',
          done: 'mindfulness.emotional-discomfort.done',
        },
        SENSE_AWARENESS: {
          label: 'list.sense-awareness',
          description: 'mindfulness.sense-awareness.description',
          actionBtnLabel: 'mindfulness.sense-awareness.action-btn-label',
          done: 'mindfulness.sense-awareness.done',
        },
        LOVING_KINDNESS: {
          label: 'list.loving-kindness',
          description: 'mindfulness.loving-kindness.description',
          actionBtnLabel: 'mindfulness.loving-kindness.action-btn-label',
          done: 'mindfulness.loving-kindness.done',
        },
      },
    },
    SLEEP: {
      label: 'list.sleep',
      subcategories: {
        SLEEP_HELP: {
          label: 'list.sleep-help',
          header: 'sleep.sleep-help.header',
          repeater: 'sleep.sleep-help.repeater',
        },
        SLEEP_HABITS: {
          label: 'list.sleep-habits',
          description: 'sleep.sleep-habits.description',
          save: 'sleep.sleep-habits.save',
          list: {
            relaxingActivities: 'sleep.sleep-habits.list.relaxing-activities',
            awakeActivities: 'sleep.sleep-habits.list.awake-activities',
            noSleepActivities: 'sleep.sleep-habits.list.no-sleep-activities',
            wakeUpActivities: 'sleep.sleep-habits.list.wake-up-activities',
          },
          relaxingActivities: 'sleep.sleep-habits.relaxing-activities.list',
          relaxingActivitiesDescription: 'sleep.sleep-habits.relaxing-activities.description',
          relaxingActivitiesReminderTitle: 'sleep.sleep-habits.relaxing-activities.reminder-title',
          relaxingActivitiesReminderBody: 'sleep.sleep-habits.relaxing-activities.reminder-body',
          relaxingActivitiesReminderTime: 'sleep.sleep-habits.relaxing-activities.reminder-time',

          awakeActivities: 'sleep.sleep-habits.awake-activities.list',
          awakeActivitiesDescription: 'sleep.sleep-habits.awake-activities.description',
          noSleepActivities: 'sleep.sleep-habits.no-sleep-activities.list',
          noSleepActivitiesDescription: 'sleep.sleep-habits.no-sleep-activities.description',
          wakeUpActivities: 'sleep.sleep-habits.wake-up-activities.list',
          wakeUpActivitiesDescription: 'sleep.sleep-habits.wake-up-activities.description',
        },
        SLEEP_PERSPECTIVE: {
          label: 'list.sleep-perspective',
          description: 'sleep.sleep-perspective.description',
          repeater: 'sleep.sleep-perspective.repeater',
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
    MY_FEELINGS: {
      label: 'list.my-feelings',
      stress: 'my-feelings.stress',
      mainActionLabel: 'my-feelings.main-action-label',
      delete: 'my-feelings.delete',
      done: 'my-feelings.done',
      next: 'my-feelings.next',
      noFeelings: 'my-feelings.no-feelings',
      chooseMainFeelings: 'my-feelings.choose-main-feelings',
      chooseSecondaryFeelings: 'my-feelings.choose-secondary-feelings',
      discomfortMeter: 'my-feelings.discomfort-meter',
      discomfortIntensity: 'my-feelings.discomfort-intensity',
      repeater: 'my-feelings.repeater',
      feelingsSummary: 'my-feelings.feelings-summary',
      feelingsSummaryDescription: 'my-feelings.feelings-summary-description',
      myFeelings: 'my-feelings.my-feelings',
      emotionIntensity: 'my-feelings.emotion-intensity',
      ok: 'my-feelings.ok',
    },
    FEELINGS: {
      ANGRY: {
        MAIN: 'feelings.angry.main',
        BETRAYED: 'feelings.angry.betrayed',
        BITTER: 'feelings.angry.bitter',
        CRITICAL: 'feelings.angry.critical',
        DEVASTATED: 'feelings.angry.devastated',
        DISGUSTED: 'feelings.angry.disgusted',
        FRUSTRATED: 'feelings.angry.frustrated',
        ANGRY: 'feelings.angry.angry',
        DETESTABLE: 'feelings.angry.detestable',
        HOSTILE: 'feelings.angry.hostile',
        HURT: 'feelings.angry.hurt',
        IRRITATED: 'feelings.angry.irritated',
        INDIGNANT: 'feelings.angry.indignant',
      },
      HAPPY: {
        MAIN: 'feelings.happy.main',
        ENERGETIC: 'feelings.happy.energetic',
        CHEERFUL: 'feelings.happy.cheerful',
        CREATIVE: 'feelings.happy.creative',
        CURIOUS: 'feelings.happy.curious',
        DARING: 'feelings.happy.daring',
        HOPEFUL: 'feelings.happy.hopeful',
        FULL_OF_IMAGINATION: 'feelings.happy.full_of_imagination',
        LIGHT: 'feelings.happy.light',
        OPTIMISTIC: 'feelings.happy.optimistic',
        PLAYFUL: 'feelings.happy.playful',
        THIN_SKINNED: 'feelings.happy.thin_skinned',
        PROVOCATIVE: 'feelings.happy.provocative',
      },
      STRONG: {
        MAIN: 'feelings.strong.main',
        APPRECIATED: 'feelings.strong.appreciated',
        CONFIDENT: 'feelings.strong.confident',
        DISCERNING: 'feelings.strong.discerning',
        ENERGETIC: 'feelings.strong.energetic',
        NOURISHING: 'feelings.strong.nourishing',
        PROUD: 'feelings.strong.proud',
        RESPECTED: 'feelings.strong.respected',
        RECEPTIVE: 'feelings.strong.receptive',
        SUCCESSFUL: 'feelings.strong.successful',
        GRATEFUL: 'feelings.strong.grateful',
        CHERISHED: 'feelings.strong.cherished',
        VALUABLE: 'feelings.strong.valuable',
      },
      SAD: {
        MAIN: 'feelings.sad.main',
        EMBARRASSED: 'feelings.sad.embarrassed',
        BORED: 'feelings.sad.bored',
        COLD: 'feelings.sad.cold',
        DEPRESSED: 'feelings.sad.depressed',
        DESPERATE: 'feelings.sad.desperate',
        DISCONNECTED: 'feelings.sad.disconnected',
        EMPTY: 'feelings.sad.empty',
        HOPELESS: 'feelings.sad.hopeless',
        HUMILIATED: 'feelings.sad.humiliated',
        LONELY: 'feelings.sad.lonely',
        TIRED: 'feelings.sad.tired',
        WORTHLESS: 'feelings.sad.worthless',
      },
      SAFE: {
        MAIN: 'feelings.safe.main',
        ACCEPTED: 'feelings.safe.accepted',
        CALM: 'feelings.safe.calm',
        LOVED: 'feelings.safe.loved',
        OPEN: 'feelings.safe.open',
        PEACEFUL: 'feelings.safe.peaceful',
        PROTECTED: 'feelings.safe.protected',
        SILENT: 'feelings.safe.silent',
        RELAXED: 'feelings.safe.relaxed',
        CARING: 'feelings.safe.caring',
        UNDERSTOOD: 'feelings.safe.understood',
        WARM: 'feelings.safe.warm',
      },
      SCARED: {
        MAIN: 'feelings.scared.main',
        ABANDONED: 'feelings.scared.abandoned',
        ANXIOUS: 'feelings.scared.anxious',
        PERPLEXED: 'feelings.scared.perplexed',
        HELPFUL: 'feelings.scared.helpful',
        INADEQUATE: 'feelings.scared.inadequate',
        INSIGNIFICANT: 'feelings.scared.insignificant',
        NUMB: 'feelings.scared.numb',
        OVERWHELMED: 'feelings.scared.overwhelmed',
        PARALYZED: 'feelings.scared.paralyzed',
        SHOCKED: 'feelings.scared.shocked',
        BLOCKED: 'feelings.scared.blocked',
        VULNERABLE: 'feelings.scared.vulnerable',
      },
    },
    WORRY_TIME: {
      label: 'list.worry-time',
      title: 'worry-time.title',
      help: 'worry-time.help',
      description: 'worry-time.description',
      writeHere: 'worry-time.write-here',
      subjectsToThinkAbout: 'worry-time.subjects-to-think-about',
      helpText: 'worry-time.help-text',
      reminder: 'worry-time.reminder',
      daily: 'worry-time.daily-reminder',
      ptsdHelp: 'worry-time.ptsd-help',
      review: 'worry-time.review',
    },
    RID: {
      label: 'list.rid',
      title: 'rid.title',
      start: 'rid.start',
      done: 'rid.done',
      description: 'rid.description',
      continue: 'rid.continue',
      relax: 'rid.relax',
      relaxation: 'rid.relaxation',
      r: 'rid.r',
      i: 'rid.i',
      d: 'rid.d',
      ridIdentify: 'rid.rid-identify',
      identify: 'rid.identify',
      identifyTrigger: 'rid.identify-trigger',
      breathe: 'rid.breathe',
      more: 'rid.30-more',
      review: 'rid.review',
      trigger: 'rid.trigger',
      triggerPlaceholder: 'rid.trigger-placeholder',
      different: 'rid.different',
      placeholder: 'rid.placeholder',
      ridDecide: 'rid.rid-decide',
      decideNext: 'rid.decide-next',
      finalStep: 'rid.final-step',
      whatWillYouDecide: 'rid.what-will-you-decide',
      decisionPlaceholder: 'rid.decision-placeholder',
      ridSummary: 'rid.rid-summary',
      triggeredHow: 'rid.triggered-how',
      differentSituation: 'rid.different-situation',
      youDecided: 'rid.you-decided',
      empty: 'rid.empty',
      date: 'rid.date',
      delete: 'rid.delete',
    },
    SOOTHE_SENSES: {
      label: 'list.soothe-senses',
      repeater: 'soothe-senses.repeater',
    },
    CONNECT_WITH_OTHERS: {
      label: 'list.connect-with-others',
      title: 'connect-with-others.title',
      done: 'connect-with-others.done',
      staticText: 'connect-with-others.static-text',
      repeater: 'connect-with-others.repeater',
    },
    CHANGE_PERSPECTIVE: {
      label: 'list.change-perspective',
      title: 'change-perspective.title',
      done: 'change-perspective.done',
      staticText: 'change-perspective.static-text',
      repeater: 'change-perspective.repeater',
    },
  };

  return {
    toolsTranslationKeys,
  };
};

export default useTranslationKeys;
