import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useEffect, useState } from 'react';
import { KVStore } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';
import { Button } from 'tamagui';

export default function Learn() {
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    const keys = KVStore().getAllKeys();
    setAllKeys(keys);
    setOnboardingDone(KVStore().getBoolean(STORE_KEYS.ONBOARDING_DONE) ?? false);
  }, []);

  const toggleOnboarding = () => {
    const newValue = !onboardingDone;
    KVStore().set(STORE_KEYS.ONBOARDING_DONE, newValue);
    setOnboardingDone(newValue);
  };

  return (
    <Screen>
      <Typography>All MKKV Keys:</Typography>
      {allKeys.map((key, index) => (
        <Typography key={index}>
          {key}:{' '}
          {KVStore().getString(key) ?? KVStore().getBoolean(key)?.toString() ?? KVStore().getNumber(key)?.toString()}
        </Typography>
      ))}
      <Button onPress={toggleOnboarding} marginTop='$md'>
        <Typography>Toggle Onboarding Done (Currently: {onboardingDone.toString()})</Typography>
      </Button>
    </Screen>
  );
}
