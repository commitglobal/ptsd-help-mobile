export interface MediaItem {
  uri: string;
  lastUpdatedAt: number;
}

export type RemoteToolsAssetsMapping = {
  [key: string]: MediaItem; // e.g., "RELATIONSHIPS.I_MESSAGES.headerImage"
};

export type LocalToolsAssetsMapping = {
  'RELATIONSHIPS.CATEGORY_ICON': string;
  'AMBIENT_SOUNDS.CATEGORY_ICON': string;
  'RELATIONSHIPS.HEALTHY_ARGUMENTS.headerImage': string;
  'AMBIENT_SOUNDS.BIRDS.soundURI': string;
  'AMBIENT_SOUNDS.CRICKETS.soundURI': string;
  'AMBIENT_SOUNDS.FROGS.soundURI': string;
  'AMBIENT_SOUNDS.DRIPPING_WATER.soundURI': string;
  'AMBIENT_SOUNDS.MARSH.soundURI': string;
  'AMBIENT_SOUNDS.PUBLIC_POOL.soundURI': string;
  'AMBIENT_SOUNDS.BEACH.soundURI': string;
  'AMBIENT_SOUNDS.STREAM_WATER.soundURI': string;
  'AMBIENT_SOUNDS.WATERFALL.soundURI': string;
  'MINDFULNESS.CATEGORY_ICON': string;
  'AMBIENT_SOUNDS.RUNNING_WATER.soundURI': string;
  'MINDFULNESS.MINDFUL_WALKING.CATEGORY_ICON': string;
  'MINDFULNESS.MINDFUL_WALKING.soundURI': string;
  'MINDFULNESS.CONSCIOUS_BREATHING.CATEGORY_ICON': string;
  'MINDFULNESS.SENSE_AWARENESS.CATEGORY_ICON': string;
  'MINDFULNESS.SENSE_AWARENESS.soundURI': string;
  'MINDFULNESS.LOVING_KINDNESS.CATEGORY_ICON': string;
  'MINDFULNESS.LOVING_KINDNESS.soundURI': string;
  'RELATIONSHIPS.I_MESSAGES.CATEGORY_ICON': string;
  'MINDFULNESS.EMOTIONAL_DISCOMFORT.CATEGORY_ICON': string;
  'MINDFULNESS.EMOTIONAL_DISCOMFORT.soundURI': string;
  'RELATIONSHIPS.HEALTHY_ARGUMENTS.CATEGORY_ICON': string;
  'RELATIONSHIPS.I_MESSAGES.headerImage': string;
  'RELATIONSHIPS.POSITIVE_COMMUNICATION.CATEGORY_ICON': string;
  'RELATIONSHIPS.RECONNECT_WITH_PARTNER.CATEGORY_ICON': string;
  'AMBIENT_SOUNDS.RAIN.soundURI': string;
  'AMBIENT_SOUNDS.WIND.soundURI': string;
  'AMBIENT_SOUNDS.COUNTRY_ROAD.soundURI': string;
  'AMBIENT_SOUNDS.FOREST.soundURI': string;
  'PAUSE.CATEGORY_ICON': string;
  'MINDFULNESS.CONSCIOUS_BREATHING.soundURI': string;
  'MY_FEELINGS.CATEGORY_ICON': string;
};