import React, { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import i18n from '@/common/config/i18n';
import { YStack } from 'tamagui';
import { RadioItem } from '@/components/RadioItem';
import { KVStore } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';

export default function ChooseLanguage() {
  const { t } = useTranslation(['choose-language', 'languages']);
  const router = useRouter();

  const languages = i18n.languages.map((language) => ({
    id: language,
    label: t(`${language}`, { ns: 'languages' }),
  }));

  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0].id);

  return (
    <Screen
      headerProps={{
        title: t('title'),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}
      contentContainerStyle={{
        backgroundColor: 'white',
      }}
      footerProps={{
        mainActionLabel: t('next'),
        onMainAction: () => {
          if (selectedLanguage) {
            KVStore().set(STORE_KEYS.LANGUAGE, selectedLanguage);
            router.push('/onboarding/onboarding-slider');
          }
        },
      }}>
      <FlashList
        ListHeaderComponent={() => (
          <>
            <Typography preset='heading' textAlign='center' marginBottom='$md'>
              {t('choose')}
            </Typography>
            <Typography textAlign='center' marginBottom='$md'>
              {t('subtitle')}
            </Typography>
          </>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
        }}
        bounces={false}
        ItemSeparatorComponent={() => <YStack height={16} />}
        data={languages}
        renderItem={({ item }) => (
          <RadioItem item={item} selectedItem={selectedLanguage} onSelectItem={setSelectedLanguage} />
        )}
        estimatedItemSize={60}
      />
    </Screen>
  );
}
