import React from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/Typography';
import { Separator, Switch, XStack } from 'tamagui';
import { Card } from '@/components/Card';
import { STORE_KEYS } from '@/constants/store-keys';
import { KVStore } from '@/helpers/mmkv';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

export default function Settings() {
  const { t } = useTranslation();
  const router = useRouter();
  const stressMeterEnabled = KVStore().getBoolean(STORE_KEYS.STRESS_METER) ?? true;
  const [isEnabled, setIsEnabled] = React.useState(stressMeterEnabled);

  const { setIsDistressMeterActive } = useToolManagerContext();

  const handleToggleStressMeter = () => {
    setIsEnabled(!isEnabled);
    KVStore().set(STORE_KEYS.STRESS_METER, !isEnabled);
    setIsDistressMeterActive(!isEnabled);
  };

  return (
    <Screen
      contentContainerStyle={{ padding: '$md', backgroundColor: 'white', gap: '$md' }}
      headerProps={{
        title: t('settings.title'),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: router.back,
      }}>
      <Section>
        <SectionItem label={t('settings.pick-contacts')} onPress={() => router.push('/contacts')} icon='user' />
      </Section>

      <Section>
        <SectionItem
          label={t('settings.change-country-and-language')}
          onPress={() => router.push('/localization/change-country')}
          icon='language'
        />
      </Section>

      <Section>
        <XStack alignItems='center' justifyContent='space-between' paddingRight='$sm'>
          <XStack alignItems='center' gap='$md'>
            <Icon icon='chart' width={24} height={24} color='$blue11' />
            <Typography>Enable stress meter</Typography>
          </XStack>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggleStressMeter}
            size='$4'
            backgroundColor={isEnabled ? '$blue8' : '$gray1'}>
            <Switch.Thumb animation='quick' backgroundColor='$blue11' />
          </Switch>
        </XStack>
      </Section>
    </Screen>
  );
}

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card padding='$md' gap='$xs'>
      {React.Children.map(children, (child, index) => (
        <>
          {child}
          {index < React.Children.count(children) - 1 && <Separator />}
        </>
      ))}
    </Card>
  );
};

const SectionItem = ({ label, onPress, icon }: { label: string; onPress: () => void; icon?: string }) => {
  return (
    <XStack
      gap='$md'
      borderColor='$gray6'
      borderRadius='$md'
      padding='$sm'
      pressStyle={{ backgroundColor: '$blue1' }}
      onPress={onPress}>
      {icon && <Icon icon={icon} width={24} height={24} color='$blue11' />}
      <Typography flex={1}>{label}</Typography>
      <Icon icon='chevronRight' color='$gray11' width={24} height={24} />
    </XStack>
  );
};
