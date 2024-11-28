import React, { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { CheckboxItem } from '@/components/CheckboxItem';
import { Typography } from '@/components/Typography';
import { YStack } from 'tamagui';
import { useFeelingsContext } from '@/contexts/FeelingsContextProvider';
import { FeelingEntry } from '@/db/schema/feelings';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { MainFeeling } from '@/enums/MainFeeling';

export default function ChooseMainFeelings() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const { setFeelings } = useFeelingsContext();
  const [mainFeelings, setMainFeelings] = useState<MainFeeling[]>([]);

  // update context feelings when the local state changes
  // we do this because of the CheckboxItem component and how it's setting the state
  useEffect(() => {
    setFeelings(
      mainFeelings.reduce((acc, feeling) => {
        acc[feeling] = [];
        return acc;
      }, {} as FeelingEntry)
    );
  }, [mainFeelings]);

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.MY_FEELINGS.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MY_FEELINGS.next),
        mainActionDisabled: mainFeelings.length === 0,
        onMainAction: () => router.push('/tools/my-feelings/choose-secondary-feelings'),
      }}>
      <FlashList
        ListHeaderComponent={
          <Typography marginBottom='$lg'>{t(toolsTranslationKeys.MY_FEELINGS.chooseMainFeelings)}</Typography>
        }
        data={Object.values(MainFeeling).map((feeling) => ({
          id: feeling,
          label: t(toolsTranslationKeys.FEELINGS[feeling].MAIN),
        }))}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <CheckboxItem item={item} selectedItems={mainFeelings} onSelectItem={setMainFeelings} />
        )}
        ItemSeparatorComponent={() => <YStack height={16} />}
        estimatedItemSize={60}
      />
    </Screen>
  );
}
