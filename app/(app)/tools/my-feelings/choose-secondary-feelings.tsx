import { MainFeeling } from '@/enums/MainFeeling';
import React from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { useFeelingsContext } from '@/contexts/FeelingsContextProvider';
import { CheckboxItem } from '@/components/CheckboxItem';
import { ScrollView, YStack } from 'tamagui';
import { Icon } from '@/components/Icon';
import useTranslationKeys from '@/hooks/useTranslationKeys';

export default function ChooseSecondaryFeelings() {
  const { t } = useTranslation('tools');
  const router = useRouter();

  const { toolsTranslationKeys } = useTranslationKeys();

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
        title: t(toolsTranslationKeys.MY_FEELINGS.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MY_FEELINGS.next),
        onMainAction: () => router.push('/tools/my-feelings/discomfort-meter'),
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: '$md', gap: '$md' }}>
        <Typography>{t(toolsTranslationKeys.MY_FEELINGS.chooseSecondaryFeelings)}</Typography>
        {Object.keys(feelings).map((feeling) => (
          <YStack key={feeling} gap='$md'>
            <Typography preset='heading'>{t(toolsTranslationKeys.FEELINGS[feeling as MainFeeling].MAIN)}</Typography>
            {Object.values(toolsTranslationKeys.FEELINGS[feeling as MainFeeling]).map((secondaryFeeling) => (
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
