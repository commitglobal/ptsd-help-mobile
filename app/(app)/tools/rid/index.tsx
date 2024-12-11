import React from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { ScrollView, Separator, Spinner, YStack } from 'tamagui';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import ridRepository, { RID } from '@/db/repositories/rid.repository';
import { GenericError } from '@/components/GenericError';
import { Card } from '@/components/Card';
import { useFavouritesManager } from '@/hooks/useFavouritesManager';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';

const RIDIndex = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const { TOOL_CONFIG } = useToolManagerContext();

  const { data: ridData, error, updatedAt } = useLiveQuery(ridRepository.getRIDs(), []);

  const { favourite, handleAddToFavourites, removeFromFavourites } = useFavouritesManager(TOOL_CONFIG.RID.id);

  if (updatedAt !== undefined && error) {
    return (
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.RID.title),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: () => router.back(),
        }}>
        <GenericError />
      </Screen>
    );
  }

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RID.title),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} />,
        onLeftPress: router.back,
        iconRight: <Icon icon={favourite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
        onRightPress: favourite ? removeFromFavourites : handleAddToFavourites,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.RID.start),
        onMainAction: () => router.push('/tools/rid/relax'),
      }}>
      <ScrollView
        contentContainerStyle={{ padding: '$md', gap: '$md' }}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        {updatedAt === undefined ? (
          // loading state
          <YStack flex={1}>
            <Spinner color='$blue11' size='large' />
          </YStack>
        ) : ridData.length === 0 ? (
          // empty state
          <>
            <Typography>{t(toolsTranslationKeys.RID.description)}</Typography>
            <Typography>{t(toolsTranslationKeys.RID.empty)}</Typography>
          </>
        ) : (
          // content state
          <>
            <Typography>{t(toolsTranslationKeys.RID.description)}</Typography>
            {ridData.map((ridItem) => (
              <RIDItem
                ridItem={ridItem}
                key={ridItem.id}
                onPress={() => router.push(`/tools/rid/ridId?id=${ridItem.id}`)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

export default RIDIndex;

const RIDItem = ({ ridItem, onPress }: { ridItem: RID; onPress: () => void }) => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  return (
    <Card padding='$md' onPress={onPress}>
      <Typography>{t(toolsTranslationKeys.RID.triggeredHow)}</Typography>
      <Typography numberOfLines={1} preset='helper'>
        {ridItem.trigger}
      </Typography>
      <Separator marginVertical={6} />
      <Typography>{t(toolsTranslationKeys.RID.differentSituation)}</Typography>
      <Typography numberOfLines={1} preset='helper'>
        {ridItem.difference}
      </Typography>
      <Separator marginVertical={6} />
      <Typography>{t(toolsTranslationKeys.RID.youDecided)}</Typography>
      <Typography numberOfLines={1} preset='helper'>
        {ridItem.decision}
      </Typography>
    </Card>
  );
};
