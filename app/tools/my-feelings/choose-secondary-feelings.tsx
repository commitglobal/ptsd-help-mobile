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

  const { feelings, setFeelings } = useFeelingsContext();

  // TODO: maybe improve this? it could be quite slow if there are many feelings selected
  const handleSecondaryFeelingsChange = (mainFeeling: MainFeeling, secondaryFeeling: string) => {
    setFeelings((currentFeelings) => {
      // find the current main feeling index
      const feelingIndex = currentFeelings.findIndex((f) => f.mainFeeling === mainFeeling);
      if (feelingIndex === -1) return currentFeelings;

      // create a copy of the current feelings array
      const newFeelings = [...currentFeelings];
      // get the current feeling object
      const feeling = newFeelings[feelingIndex];

      // Update the specific feeling's secondaryFeelings
      newFeelings[feelingIndex] = {
        ...feeling,
        secondaryFeelings: feeling.secondaryFeelings.includes(secondaryFeeling)
          ? feeling.secondaryFeelings.filter((f) => f !== secondaryFeeling)
          : [...feeling.secondaryFeelings, secondaryFeeling],
      };

      return newFeelings;
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
        {feelings.map((feeling) => (
          <YStack key={feeling.mainFeeling} gap='$md'>
            <Typography preset='heading'>{feeling.mainFeeling}</Typography>

            {Object.entries(FEELINGS[feeling.mainFeeling]).map(([key, secondaryFeeling]) => (
              <CheckboxItem
                key={key}
                item={{ id: secondaryFeeling, label: secondaryFeeling }}
                selectedItems={feeling.secondaryFeelings}
                onSelectItem={() => handleSecondaryFeelingsChange(feeling.mainFeeling, secondaryFeeling)}
              />
            ))}
          </YStack>
        ))}
      </ScrollView>
    </Screen>
  );
}
