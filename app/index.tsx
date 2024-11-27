import { STORE_KEYS } from '@/constants/store-keys';
import { KVStore } from '@/helpers/mmkv';
import { Redirect } from 'expo-router';

export default function Index() {
  const onboardingDone = KVStore().getBoolean(STORE_KEYS.ONBOARDING_DONE) ?? false;

  return <Redirect href={onboardingDone ? '/(drawer)' : '/onboarding'} />;
}