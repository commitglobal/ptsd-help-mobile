import React from 'react';
import { Typography } from './Typography';
import { Icon } from './Icon';
import { XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';

export const GenericError = ({ errorMessage }: { errorMessage?: string }) => {
  const { t } = useTranslation();

  return (
    <XStack gap='$md' alignItems='center'>
      <Icon icon='exclamationCircle' width={24} height={24} color='$tomato10' />
      <Typography flex={1} color='$tomato10'>
        {errorMessage ?? t('common.generic-error', { ns: 'translation' })}
      </Typography>
    </XStack>
  );
};
