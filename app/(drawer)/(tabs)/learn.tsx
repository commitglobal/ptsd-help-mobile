import { KeyValueStorage } from "@/app/index";
import { Screen } from "@/components/Screen";
import { useEffect, useState } from "react";
import { Typography } from '@/components/Typography';
import { STORE_KEYS } from '@/constants/store-keys';

export default function Learn() {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    setLanguage(KeyValueStorage().getString(STORE_KEYS.LANGUAGE) || null);
  }, []);

  return (
    <Screen>
      <Typography>Learn. {language}</Typography>
    </Screen>
  );
}
