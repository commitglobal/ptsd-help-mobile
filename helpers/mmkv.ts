import { MMKV } from 'react-native-mmkv';

let instance: MMKV | null = null;

export const KVStore = () => {
  if (!instance) {
    instance = new MMKV();
  }

  return instance;
};
