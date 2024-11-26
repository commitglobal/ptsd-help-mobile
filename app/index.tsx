import { STORE_KEYS } from '@/constants/store-keys';
import { MKKV } from '@/helpers/mmkv';
import { Redirect } from 'expo-router';

export default function Index() {
  const onboardingDone = MKKV().getBoolean(STORE_KEYS.ONBOARDING_DONE) ?? false;

  return <Redirect href={onboardingDone ? '/(drawer)' : '/onboarding'} />;
}
