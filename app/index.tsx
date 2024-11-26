import { MMKV } from 'react-native-mmkv'
// import { STORE_KEYS } from '@/constants/store-keys';

// Create and initialise the MMKV instance
let instance: MMKV | null = null;

export const KeyValueStorage = () => {
    if (!instance) {
        instance = new MMKV();
    }
    return instance;
}
