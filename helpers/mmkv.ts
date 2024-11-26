import { MMKV } from 'react-native-mmkv';

let instance: MMKV | null = null;

export const MKKV = () => {
  if (!instance) {
    instance = new MMKV();
  }

  return instance;
};
