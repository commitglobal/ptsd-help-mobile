import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Typography } from './Typography';
import { Icon } from './Icon';
import { useTranslation } from 'react-i18next';

type FormInputProps = {
  label: string;
  infoMessage?: string;
  onInfoMessagePress?: () => void;
  onPress?: () => void;
};

export const ImageFormInput = ({ label, infoMessage, onInfoMessagePress, onPress }: FormInputProps) => {
  const { t } = useTranslation();

  return (
    <YStack gap='$sm' onPress={onPress} pressStyle={{ opacity: onPress ? 0.5 : 1 }}>
      <XStack justifyContent='space-between' gap='$md'>
        <Typography flex={1}>{label}</Typography>
        {infoMessage && (
          <XStack
            padding='$sm'
            margin={-12}
            alignSelf='flex-start'
            onPress={onInfoMessagePress}
            pressStyle={{ opacity: 0.5 }}>
            <Icon icon='info' width={18} height={18} color='$blue11' />
          </XStack>
        )}
      </XStack>
      <YStack
        borderWidth={1}
        borderColor='$gray4'
        borderRadius={9}
        padding='$md'
        backgroundColor='$gray1'
        justifyContent='center'
        alignItems='center'>
        <Icon icon='solidPhoto' width={55} height={55} color='$gray5' />
        <Typography color='$gray9' preset='helper'>
          {t('common.pick-image')}
        </Typography>
      </YStack>
    </YStack>
  );
};
