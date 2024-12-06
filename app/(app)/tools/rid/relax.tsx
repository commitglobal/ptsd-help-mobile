import React, { useState, useEffect } from 'react';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { ScrollView, XStack } from 'tamagui';

const RIDRelax = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);

  // start 30s timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const resetTimer = () => {
    setTimeLeft(30);
    setIsActive(true);
  };

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RID.relax),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} />,
        onLeftPress: router.back,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.RID.continue),
        onMainAction: () => router.push('/tools/rid/identify'),
        secondaryActionLabel: t(toolsTranslationKeys.RID.more),
        onSecondaryAction: resetTimer,
        secondaryActionDisabled: isActive,
      }}>
      <ScrollView
        contentContainerStyle={{ padding: '$md', gap: '$sm' }}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        <XStack justifyContent='center'>
          <Typography preset='heading' color='$tomato10'>
            {t(toolsTranslationKeys.RID.r)}
          </Typography>
          <Typography preset='heading'>{t(toolsTranslationKeys.RID.i)}</Typography>
          <Typography preset='heading'>{t(toolsTranslationKeys.RID.d)}</Typography>
        </XStack>
        <Typography preset='subheading' textAlign='center'>
          {t(toolsTranslationKeys.RID.relaxation)}
        </Typography>
        <Typography>{t(toolsTranslationKeys.RID.breathe)}</Typography>

        <Typography preset='heading' textAlign='center'>
          {timeLeft}
        </Typography>
      </ScrollView>
    </Screen>
  );
};

export default RIDRelax;
