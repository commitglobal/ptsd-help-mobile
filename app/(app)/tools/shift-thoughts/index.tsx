import { useRouter } from 'expo-router';
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
import { useFavoritesManager } from '@/hooks/useFavoritesManager';

const PAUSE_TIME = 5 * 60;
export default function ShiftThoughts() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PAUSE_TIME);
  const { t } = useTranslation('tools');
  const router = useRouter();

  const { finishTool, TOOL_CONFIG } = useToolManagerContext();
  const { favorite, handleAddToFavorites, removeFromFavorites } = useFavoritesManager(TOOL_CONFIG.SHIFT_THOUGHTS.id);

  const { mediaMapping } = useAssetsManagerContext();
  const { toolsTranslationKeys } = useTranslationKeys();

  const items = t(toolsTranslationKeys.SHIFT_THOUGHTS.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setIsTimerActive(false);
            return PAUSE_TIME;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive]);

  return (
    <ScreenWithChangingText
      headerProps={{
        title: t(toolsTranslationKeys.SHIFT_THOUGHTS.title),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon={favorite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
        onRightPress: favorite ? removeFromFavorites : handleAddToFavorites,
      }}
      staticText={t(toolsTranslationKeys.SHIFT_THOUGHTS.helper)}
      items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
      imageUrl={mediaMapping['SHIFT_THOUGHTS.CATEGORY_ICON']}
      footerProps={{ onMainAction: () => finishTool() }}>
      <YStack alignItems='center' justifyContent='center' gap='$4' marginBottom='$12' marginTop='auto'>
        {!isTimerActive && (
          <Button onPress={() => setIsTimerActive(true)}>{t(toolsTranslationKeys.SHIFT_THOUGHTS.start)}</Button>
        )}
        {isTimerActive && (
          <Typography preset='heading'>
            {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
          </Typography>
        )}
      </YStack>
    </ScreenWithChangingText>
  );
}
