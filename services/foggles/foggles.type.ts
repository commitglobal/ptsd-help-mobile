export interface RelationshipSubcategories {
  'relationships-reconnect-with-partner': { enabled: boolean };
  'relationships-positive-communication': { enabled: boolean };
  'relationships-i-messages': { enabled: boolean };
  'relationships-healthy-arguments': { enabled: boolean };
}

export interface MindfulnessSubcategories {
  'mindfulness-conscious-breathing': { enabled: boolean };
  'mindfulness-mindful-walking': { enabled: boolean };
  'mindfulness-emotional-discomfort': { enabled: boolean };
  'mindfulness-sense-awareness': { enabled: boolean };
  'mindfulness-loving-kindness': { enabled: boolean };
}

export interface FoggleFeatureToolsConfig {
  enabled: boolean;
  subcategories?: {
    [key: string]: {
      enabled: boolean;
    };
  };
}

export interface FoggleFeatures {
  tools: {
    relationships: FoggleFeatureToolsConfig & {
      subcategories: RelationshipSubcategories;
    };
    ambientSounds: FoggleFeatureToolsConfig;
    mindfulness: FoggleFeatureToolsConfig & {
      subcategories: MindfulnessSubcategories;
    };
    [key: string]: FoggleFeatureToolsConfig;
  };
}

interface Foggles {
  version: string;
  lastUpdated: string;
  features: FoggleFeatures;
}

export type FogglesConfig = Foggles | undefined | null;
