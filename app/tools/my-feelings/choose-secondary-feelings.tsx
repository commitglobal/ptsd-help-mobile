import { MainFeeling, FEELINGS } from '@/constants/Feelings';
import React from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { Typography } from '@/components/Typography';
import { useFeelingsContext } from '@/contexts/FeelingsContextProvider';
import { CheckboxItem } from '@/components/CheckboxItem';
import { ScrollView, YStack } from 'tamagui';
import { Icon } from '@/components/Icon';

export default function ChooseSecondaryFeelings() {
  const { t } = useTranslation('tools');
  const router = useRouter();

  const translationKey = TOOLS_TRANSLATIONS_CONFIG.MY_FEELINGS;
  const feelingsTranslationKey = TOOLS_TRANSLATIONS_CONFIG.FEELINGS;

  const { feelings, setFeelings } = useFeelingsContext();

  const handleSelectSecondaryFeelings = (mainFeeling: MainFeeling, selectedItems: string[]) => {
    setFeelings((prev) => {
      return {
        ...prev,
        [mainFeeling]: selectedItems,
      };
    });
  };

  return (
    <Screen
      headerProps={{
        title: t(translationKey.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
      }}
      footerProps={{
        mainActionLabel: t(translationKey.next),
        onMainAction: () => router.push('/tools/my-feelings/discomfort-meter'),
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: '$md', gap: '$md' }}>
        <Typography>{t(translationKey.chooseSecondaryFeelings)}</Typography>
        {Object.keys(feelings).map((feeling) => (
          <YStack key={feeling} gap='$md'>
            <Typography preset='heading'>{t(feelingsTranslationKey[feeling as MainFeeling].MAIN)}</Typography>
            {Object.values(FEELINGS[feeling as MainFeeling]).map((secondaryFeeling) => (
              <CheckboxItem
                key={secondaryFeeling}
                item={{
                  id: secondaryFeeling,
                  label: t(secondaryFeeling),
                }}
                selectedItems={feelings[feeling as MainFeeling] || []}
                onSelectItem={(selectedItems: string[]) =>
                  handleSelectSecondaryFeelings(feeling as MainFeeling, selectedItems)
                }
              />
            ))}
          </YStack>
        ))}
      </ScrollView>
    </Screen>
  );
}
