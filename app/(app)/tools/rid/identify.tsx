import React from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { ScrollView, XStack } from 'tamagui';
import { Typography } from '@/components/Typography';

const RIDIdentify = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RID.ridIdentify),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} />,
        onLeftPress: router.back,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.RID.continue),
        onMainAction: () => router.push('/tools/rid/identify-form'),
      }}>
      <ScrollView
        contentContainerStyle={{ padding: '$md', gap: '$sm' }}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        <XStack justifyContent='center'>
          <Typography preset='heading'>{t(toolsTranslationKeys.RID.r)}</Typography>
          <Typography preset='heading' color='$tomato10'>
            {t(toolsTranslationKeys.RID.i)}
          </Typography>
          <Typography preset='heading'>{t(toolsTranslationKeys.RID.d)}</Typography>
        </XStack>
        <Typography preset='subheading' textAlign='center'>
          {t(toolsTranslationKeys.RID.identify)}
        </Typography>

        <Typography>{t(toolsTranslationKeys.RID.review)}</Typography>
      </ScrollView>
    </Screen>
  );
};

export default RIDIdentify;
