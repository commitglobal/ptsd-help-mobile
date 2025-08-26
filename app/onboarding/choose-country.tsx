import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { RadioItem } from '@/components/RadioItem';
import { YStack } from 'tamagui';
import { KVStore } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';
import { Country } from '@/constants/countries';

const ChooseCountry = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState<string>();

  const countriesArray = [Country.Romania, Country.Armenia, Country.Ukraine];
  const countryFlags = {
    [Country.Romania]: require('../../assets/images/flags/ro.png'),
    [Country.Armenia]: require('../../assets/images/flags/am.png'),
    [Country.Ukraine]: require('../../assets/images/flags/ua.png'),
  } as const;

  const countries = useMemo(
    () =>
      countriesArray.map((country) => ({
        id: country,
        label: t(`choose-country.countries.${country}`),
        avatar: countryFlags[country as keyof typeof countryFlags],
      })),
    [countriesArray, t]
  );

  return (
    <Screen
      headerProps={{
        title: t('choose-country.title'),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}
      contentContainerStyle={{
        backgroundColor: 'white',
      }}
      footerProps={{
        mainActionLabel: t('choose-country.next'),
        onMainAction: () => {
          if (selectedCountry) {
            KVStore().set(STORE_KEYS.COUNTRY, selectedCountry.toUpperCase());
            router.push('/onboarding/choose-language');
          }
        },
        mainActionDisabled: !selectedCountry,
      }}>
      <FlashList
        ListHeaderComponent={() => (
          <>
            <Typography preset='heading' textAlign='center' marginBottom='$md'>
              {t('choose-country.choose')}
            </Typography>
            <Typography textAlign='center' marginBottom='$md'>
              {t('choose-country.subtitle')}
            </Typography>
          </>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
        }}
        bounces={false}
        ItemSeparatorComponent={() => <YStack height={16} />}
        data={countries}
        renderItem={({ item }) => (
          <RadioItem item={item} selectedItem={selectedCountry} onSelectItem={setSelectedCountry} />
        )}
        estimatedItemSize={60}
      />
    </Screen>
  );
};

export default ChooseCountry;
