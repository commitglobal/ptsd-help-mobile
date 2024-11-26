import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { ScrollView } from 'tamagui';
import { Typography } from '@/components/Typography';
import TextareaInput from '@/components/Inputs/Textarea';
import { scrollToTextarea } from '@/helpers/scrollToTextarea';
import TextFormInput from '@/components/TextFormInput';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import worriesRepository from '@/db/repositories/worries.repository';

export default function WorryTime() {
  const { t } = useTranslation('tools');
  const translationKey = TOOLS_TRANSLATIONS_CONFIG.WORRY_TIME;
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const textareaRef = useRef<React.ElementRef<typeof TextareaInput>>(null);
  const { finishTool } = useToolManagerContext();

  const { data: worries } = useLiveQuery(worriesRepository.getWorries(), []);
  const [worryText, setWorryText] = useState(worries[0]?.worry || '');

  useEffect(() => {
    setWorryText(worries[0]?.worry || '');
  }, [worries]);

  const handleFocus = () => {
    if (textareaRef.current && scrollViewRef.current) {
      scrollToTextarea(scrollViewRef, textareaRef);
    }
  };

  const handleDone = () => {
    // if we have no worries, create one, otherwise update the existing one
    if (worries.length === 0) {
      worriesRepository.createWorry({
        worry: worryText,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      });
    } else {
      worriesRepository.updateWorry(worries[0].id, {
        ...worries[0],
        worry: worryText,
      });
    }
    finishTool();
  };

  return (
    <Screen
      headerProps={{
        title: t(translationKey.title),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        onMainAction: handleDone,
        secondaryActionLabel: t(translationKey.help),
        onSecondaryAction: () => router.push('/tools/worry-time/help'),
      }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16, padding: 16 }} ref={scrollViewRef}>
        <Typography>{t(translationKey.description)}</Typography>

        <TextFormInput
          label={t(translationKey.subjectsToThinkAbout)}
          ref={textareaRef}
          placeholder={t(translationKey.writeHere)}
          height={300}
          onPress={handleFocus}
          value={worryText}
          onChange={({ target: { value } }: any) => setWorryText(value)}
        />
      </ScrollView>
    </Screen>
  );
}
