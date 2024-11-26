import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useEffect, useState } from 'react';
import { STORE_KEYS } from '@/constants/store-keys';
import { MKKV } from '@/helpers/mmkv';

export default function Learn() {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(MKKV().getString(STORE_KEYS.LANGUAGE) || null);
  }, []);

  return (
    <Screen>
      <Typography>Learn. {language}</Typography>
    </Screen>
  );
}
