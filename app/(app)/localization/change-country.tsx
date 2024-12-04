import React, { useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { KVStore } from '@/helpers/mmkv';
import { STORE_KEYS } from '@/constants/store-keys';
import { FlashList } from '@shopify/flash-list';
import { Typography } from '@/components/Typography';
import { YStack } from 'tamagui';
import { RadioItem } from '@/components/RadioItem';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChangeCountry() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedCountry, setSelectedCountry] = useState<string>();

  const countriesArray = ['ro', 'am', 'ua'];
  const countryFlags = {
    ro: require('../../../assets/images/flags/ro.png'),
    am: require('../../../assets/images/flags/am.png'),
    ua: require('../../../assets/images/flags/ua.png'),
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
            // TODO: do we leave the selection here?
            KVStore().set(STORE_KEYS.COUNTRY, selectedCountry);
            router.push('/localization/change-language');
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
          <RadioItem item={item} selectedItem={selectedCountry} onSelectItem={setSelectedCountry} />
        )}
        estimatedItemSize={60}
      />
    </Screen>
  );
}
