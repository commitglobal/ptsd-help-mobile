import { S3_CMS_CONFIG_FOLDER } from '@/constants/cms';
import { FogglesConfig } from './foggles.type';
import * as FileSystem from 'expo-file-system';

export const fetchFoggles = async (countryCode: string) => {
  const localFogglesPath = `${FileSystem.documentDirectory}foggles_${countryCode}.json`;

  const getLocalFoggles = async (): Promise<FogglesConfig | null> => {
    try {
      const localFogglesJson = await FileSystem.readAsStringAsync(localFogglesPath);
      return JSON.parse(localFogglesJson);
    } catch (error) {
      console.log('No existing local foggles found', error);
      return null;
    }
  };

  const getRemoteFoggles = async () => {
    try {
      const response = await fetch(`${S3_CMS_CONFIG_FOLDER}foggles_${countryCode}.json`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching remote foggles:', error);
      return null;
    }
  };

  try {
    const [localFoggles, remoteFoggles] = await Promise.all([getLocalFoggles(), getRemoteFoggles()]);

    if (!localFoggles && !remoteFoggles) {
      return null;
    }

    const shouldUpdateLocal =
      !localFoggles || new Date(remoteFoggles?.lastUpdated) > new Date(localFoggles?.lastUpdated);

    if (shouldUpdateLocal && remoteFoggles) {
      await FileSystem.writeAsStringAsync(localFogglesPath, JSON.stringify(remoteFoggles, null, 2));
      console.log(`🐸 Updated foggles saved to: ${localFogglesPath}`);
      return remoteFoggles;
    }

    return localFoggles;
  } catch (error) {
    console.error('Error fetching/saving foggles:', error);
    return null;
  }
};
