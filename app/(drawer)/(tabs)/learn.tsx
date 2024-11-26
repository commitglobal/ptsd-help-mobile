import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useEffect, useState } from 'react';
import { MKKV } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';
import { Button } from 'tamagui';

export default function Learn() {
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    const keys = MKKV().getAllKeys();
    setAllKeys(keys);
    setOnboardingDone(MKKV().getBoolean(STORE_KEYS.ONBOARDING_DONE) ?? false);
  }, []);

  const toggleOnboarding = () => {
    const newValue = !onboardingDone;
    MKKV().set(STORE_KEYS.ONBOARDING_DONE, newValue);
    setOnboardingDone(newValue);
  };

  return (
    <Screen>
      <Typography>All MKKV Keys:</Typography>
      {allKeys.map((key, index) => (
        <Typography key={index}>
          {key}: {MKKV().getString(key) ?? MKKV().getBoolean(key)?.toString() ?? MKKV().getNumber(key)?.toString()}
        </Typography>
      ))}
      <Button onPress={toggleOnboarding} marginTop='$md'>
        <Typography>Toggle Onboarding Done (Currently: {onboardingDone.toString()})</Typography>
      </Button>
    </Screen>
  );
}
