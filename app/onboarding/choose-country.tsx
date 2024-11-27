import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { RadioItem } from '@/components/RadioItem';
import { YStack } from 'tamagui';
import { KVStore } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';
const ChooseCountry = () => {
  const { t } = useTranslation('choose-country');
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState<string>();

  const countriesArray = ['ro', 'am', 'ua'];
  const countryFlags = {
    ro: require('../../assets/images/flags/ro.png'),
    am: require('../../assets/images/flags/am.png'),
    ua: require('../../assets/images/flags/ua.png'),
  } as const;

  const countries = useMemo(
    () =>
      countriesArray.map((country) => ({
        id: country,
        label: t(`countries.${country}`),
        avatar: countryFlags[country as keyof typeof countryFlags],
      })),
    [countriesArray, t]
  );

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
          if (selectedCountry) {
            KVStore().set(STORE_KEYS.COUNTRY, selectedCountry);
            router.push('/onboarding/choose-language');
          }
        },
        mainActionDisabled: !selectedCountry,
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
