import React from 'react';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import feelingsRepository, { Feeling } from '@/db/repositories/feelings.repository';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Typography } from '@/components/Typography';
import { Separator, Spinner, XStack, YStack } from 'tamagui';
import { Card } from '@/components/Card';
import { format } from 'date-fns';
import { getDiscomfortLevel, useDiscomfortLevels } from '@/contexts/FeelingsContextProvider';
import { GenericError } from '@/components/GenericError';
import { MainFeeling } from '@/enums/MainFeeling';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useFavouritesManager } from '@/hooks/useFavouritesManager';

export default function MyFeelings() {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();
  const { finishTool, TOOL_CONFIG } = useToolManagerContext();

  const { favourite, handleAddToFavourites, removeFromFavourites } = useFavouritesManager(TOOL_CONFIG.MY_FEELINGS.id);

  const { data: feelings, error, updatedAt } = useLiveQuery(feelingsRepository.getFeelings(), []);

  if (updatedAt !== undefined && error) {
    return (
      <ScreenWithImageHeader
        imageUrl={mediaMapping['MY_FEELINGS.CATEGORY_ICON']}
        headerProps={{
          title: t(toolsTranslationKeys.MY_FEELINGS.label),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
        }}>
        <GenericError />
      </ScreenWithImageHeader>
    );
  }

  return (
    <ScreenWithImageHeader
      imageUrl={mediaMapping['MY_FEELINGS.CATEGORY_ICON']}
      headerProps={{
        title: t(toolsTranslationKeys.MY_FEELINGS.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
        iconRight: <Icon icon={favourite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
        onRightPress: favourite ? removeFromFavourites : handleAddToFavourites,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MY_FEELINGS.mainActionLabel),
        onMainAction: () => router.push('/tools/my-feelings/choose-main-feelings'),
        secondaryActionLabel: t(toolsTranslationKeys.MY_FEELINGS.done),
        onSecondaryAction: finishTool,
      }}>
      {updatedAt === undefined ? (
        // loading state
        <YStack flex={1}>
          <Spinner color='$blue11' size='large' />
        </YStack>
      ) : feelings.length === 0 ? (
        // empty state
        <Typography>{t(toolsTranslationKeys.MY_FEELINGS.noFeelings)}</Typography>
      ) : (
        // content state
        <>
          {feelings.map((feeling) => (
            <FeelingCard
              feeling={feeling}
              key={feeling.id}
              onPress={() => router.push(`/tools/my-feelings/delete-feeling?feelingId=${feeling.id}`)}
            />
          ))}
        </>
      )}
    </ScreenWithImageHeader>
  );
}

const FeelingCard = ({ feeling, onPress }: { feeling: Feeling; onPress: () => void }) => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  const discomfortLevelsArray = useDiscomfortLevels();
  const currentDiscomfortLevel = getDiscomfortLevel(feeling.discomfort, discomfortLevelsArray);

  return (
    <Card padding='$md' onPress={onPress}>
      <YStack gap='$md'>
        {/* stress section */}
        <XStack>
          <XStack flex={0.3} justifyContent='center' alignItems='center'>
            <Typography preset='heading'>{`${feeling.discomfort}%`}</Typography>
          </XStack>
          <YStack flex={0.7}>
            <Typography>
              {t(toolsTranslationKeys.MY_FEELINGS.stress)}: {currentDiscomfortLevel}
            </Typography>
            <Typography preset='helper'>{format(new Date(feeling.createdAt), 'EEEE, MMM. d, yyyy')}</Typography>
          </YStack>
        </XStack>

        <Separator />

        {/* feelings section */}
        <YStack gap='$xs'>
          {Object.keys(feeling.feelings).map((mainFeeling) => (
            <XStack key={mainFeeling}>
              <Typography flex={0.3} preset='subheading' color='$blue11' textAlign='center'>
                {t(toolsTranslationKeys.FEELINGS[mainFeeling as MainFeeling].MAIN)}
              </Typography>

              {feeling.feelings[mainFeeling as MainFeeling]?.length !== 0 && (
                <Typography flex={0.7}>
                  {feeling.feelings[mainFeeling as MainFeeling]
                    ?.map((secondaryFeeling) => t(secondaryFeeling))
                    .join(', ')}
                </Typography>
              )}
            </XStack>
          ))}
        </YStack>
      </YStack>
    </Card>
  );
};
