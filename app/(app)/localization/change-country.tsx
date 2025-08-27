import React, { useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { FlashList } from '@shopify/flash-list';
import { Typography } from '@/components/Typography';
import { YStack } from 'tamagui';
import { RadioItem } from '@/components/RadioItem';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCountries, Country, CountryFlagMap } from '@/constants/countries';

export default function ChangeCountry() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedCountry, setSelectedCountry] = useState<string>();

  const countries = useMemo(
    () =>
      AppCountries.map((country) => ({
        id: country,
        label: t(`choose-country.countries.${country}`),
        avatar: CountryFlagMap[country as Country],
      })),
    [AppCountries, t]
  );

  function handleSetSelectedCountry(country: string) {
    console.log(country);
    setSelectedCountry(country);
  }
  return (
    <Screen
      headerProps={{
        title: t('choose-country.choose'),
        iconRight: <Icon icon='x' color='$gray12' width={24} height={24} />,
        onRightPress: router.back,
        paddingTop: Platform.OS === 'ios' ? '$md' : insets.top + 16,
      }}
      contentContainerStyle={{
        backgroundColor: 'white',
      }}
      footerProps={{
        mainActionLabel: t('choose-country.next'),
        onMainAction: () => {
          if (selectedCountry) {
            router.push(`/localization/change-language?country=${selectedCountry}`);
          }
        },
        mainActionDisabled: !selectedCountry,
      }}>
      <FlashList
        ListHeaderComponent={() => (
          <Typography textAlign='center' marginBottom='$md'>
            {t('choose-country.subtitle')}
          </Typography>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
        bounces={false}
        ItemSeparatorComponent={() => <YStack height={16} />}
        data={countries}
        renderItem={({ item }) => (
          <RadioItem item={item} selectedItem={selectedCountry} onSelectItem={handleSetSelectedCountry} />
        )}
        estimatedItemSize={60}
      />
    </Screen>
  );
}
