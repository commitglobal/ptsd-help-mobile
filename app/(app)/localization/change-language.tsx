import React, { useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { useQueryClient } from '@tanstack/react-query';
import { Country } from '@/constants/countries';
import { CountryLanguageMap } from '@/constants/languages';
import { toolsLocalesMap } from '@/constants/tools';

export default function ChangeLanguage() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { country } = useLocalSearchParams<{ country: string }>();
  const languages = useMemo(
    () =>
      CountryLanguageMap[country as Country]?.map((language) => ({
        id: language,
        label: t(`languages.${language}`),
      })) ??
      i18n.languages.map((language) => ({
        id: language,
        label: t(`languages.${language}`),
      })),
    [country, i18n.languages]
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0].id);

  const handleDone = async () => {
    if (selectedLanguage && country) {
      console.log('🚀 ~ handleDone ~ selectedLanguage:', selectedLanguage);
      KVStore().set(STORE_KEYS.LANGUAGE, selectedLanguage);
      KVStore().set(STORE_KEYS.COUNTRY, country.toUpperCase());
      const tools: any = toolsLocalesMap[country.toUpperCase() as Country][selectedLanguage];

      try {
        i18n.addResourceBundle(selectedLanguage, 'tools', tools);
        i18n.changeLanguage(selectedLanguage);
        queryClient.invalidateQueries({ queryKey: ['country-language'] });
        router.dismissAll();
        router.back();
      } catch (error) {
        console.error('🔴🔴🔴 ERROR IN CHANGE LANGUAGE 🔴🔴🔴', error);
      }
    }
  };

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
        onMainAction: handleDone,
      }}
      footerContainerStyle={{
        paddingBottom: Platform.OS === 'ios' ? insets.bottom + 64 : insets.bottom + 16,
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
        extraData={selectedLanguage}
      />
    </Screen>
  );
}
