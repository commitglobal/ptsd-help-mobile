import React, { useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { FlashList } from '@shopify/flash-list';
import { Typography } from '@/components/Typography';
import { YStack } from 'tamagui';
import { RadioItem } from '@/components/RadioItem';
import { KVStore } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';
import i18n from '@/common/config/i18n';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChangeLanguage() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const languages = i18n.languages.map((language) => ({
    id: language,
    label: t(`languages.${language}`),
  }));

  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0].id);

  return (
    <Screen
      headerProps={{
        title: t('choose-language.choose'),
        paddingTop: Platform.OS === 'ios' ? '$md' : insets.top + 16,
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}
      contentContainerStyle={{
        backgroundColor: 'white',
      }}
      footerProps={{
        mainActionLabel: t('choose-language.done'),
        onMainAction: () => {
          if (selectedLanguage) {
            // TODO: do we leave the selection here?
            KVStore().set(STORE_KEYS.LANGUAGE, selectedLanguage);
            router.dismissAll();
            router.back();
          }
        },
      }}>
      <FlashList
        ListHeaderComponent={() => (
          <Typography textAlign='center' marginBottom='$md'>
            {t('choose-language.subtitle')}
          </Typography>
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
