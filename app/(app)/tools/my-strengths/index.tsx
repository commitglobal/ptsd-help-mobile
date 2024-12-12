import React, { useMemo } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { YStack, XStack, Spinner } from 'tamagui';
import { Typography } from '@/components/Typography';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import strengthsRepository, { Strength } from '@/db/repositories/strengths.repository';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@/components/Card';
import { GenericError } from '@/components/GenericError';
import { Image } from 'expo-image';
import { blurhash } from '@/helpers/blurhash';
import { useFavoritesManager } from '@/hooks/useFavoritesManager';

const MyStrengths = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const { finishTool, TOOL_CONFIG } = useToolManagerContext();
  const { favorite, handleAddToFavorites, removeFromFavorites } = useFavoritesManager(TOOL_CONFIG.MY_STRENGTHS.id);
  const { data: strengths, updatedAt, error } = useLiveQuery(strengthsRepository.getStrengths(), []);

  // error screen
  if (updatedAt !== undefined && error) {
    return (
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.MY_STRENGTHS.title),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: router.back,
        }}
        contentContainerStyle={{ padding: 24 }}>
        <GenericError />
      </Screen>
    );
  }

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.MY_STRENGTHS.title),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: router.back,
        iconRight: <Icon icon={favorite ? 'solidHeart' : 'heart'} color='$gray12' width={24} height={24} />,
        onRightPress: favorite ? removeFromFavorites : handleAddToFavorites,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.done),
        onMainAction: finishTool,
        secondaryActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.add),
        onSecondaryAction: () => router.push('/tools/my-strengths/strength'),
      }}>
      {/* loading state */}
      {updatedAt === undefined ? (
        <YStack flex={1} justifyContent='center' alignItems='center'>
          <Spinner color='$blue11' size='large' />
        </YStack>
      ) : (
        // content
        <FlashList
          bounces={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Typography marginBottom={24}>{t(toolsTranslationKeys.MY_STRENGTHS.description)}</Typography>
          }
          contentContainerStyle={{ padding: 16 }}
          data={strengths}
          renderItem={({ item }) => (
            <StrengthItem strength={item} onPress={() => router.push(`/tools/my-strengths/strength?id=${item.id}`)} />
          )}
          estimatedItemSize={400}
          ItemSeparatorComponent={() => <YStack height={16} />}
        />
      )}
    </Screen>
  );
};

export default MyStrengths;

const StrengthItem = ({ strength, onPress }: { strength: Strength; onPress: () => void }) => {
  const { strength: strengthText, image } = strength;
  const [imageSize, setImageSize] = React.useState<{ width: number; height: number } | null>(null);

  const isPortrait = useMemo(
    () => (imageSize?.height && imageSize?.width ? imageSize.height > imageSize.width : null),
    [imageSize?.height, imageSize?.width]
  );

  return (
    <Card onPress={onPress} pressStyle={{ opacity: 1 }}>
      {image && (
        <>
          <XStack>
            <Image
              source={{ uri: image }}
              onLoad={(e) => {
                const { width, height } = e.source;
                setImageSize({ width, height });
              }}
              contentFit='cover'
              style={{
                width: '100%',
                borderRadius: 9,
                aspectRatio: isPortrait ? 9 / 16 : 16 / 9,
              }}
              placeholder={{ blurhash }}
            />
          </XStack>
        </>
      )}

      {strengthText && (
        <YStack padding='$md'>
          <Typography>{strengthText}</Typography>
        </YStack>
      )}
    </Card>
  );
};
