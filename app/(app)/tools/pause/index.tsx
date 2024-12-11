import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { Typography } from '@/components/Typography';
import { YStack } from 'tamagui';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

const PAUSE_TIME = 5 * 60;
export default function Pause() {
  const [isPauseActive, setIsPauseActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PAUSE_TIME);
  const { t } = useTranslation('tools');
  const router = useRouter();

  const { finishTool } = useToolManagerContext();

  const { mediaMapping } = useAssetsManagerContext();
  const { toolsTranslationKeys } = useTranslationKeys();

  const items = t(toolsTranslationKeys.PAUSE.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPauseActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setIsPauseActive(false);
            return PAUSE_TIME;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPauseActive]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithChangingText
        headerProps={{
          title: t(toolsTranslationKeys.PAUSE.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        staticText={t(toolsTranslationKeys.PAUSE.helper)}
        items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
        imageUrl={mediaMapping['PAUSE.CATEGORY_ICON']}
        footerProps={{ onMainAction: () => finishTool() }}>
        <YStack alignItems='center' justifyContent='center' gap='$4' marginBottom='$12' marginTop='auto'>
          {!isPauseActive && (
            <Button onPress={() => setIsPauseActive(true)}>{t(toolsTranslationKeys.PAUSE.takeBreak)}</Button>
          )}
          {isPauseActive && (
            <Typography preset='heading'>
              {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
            </Typography>
          )}
        </YStack>
      </ScreenWithChangingText>
    </>
  );
}
