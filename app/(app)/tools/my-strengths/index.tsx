import React from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { YStack, Image, XStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import strengthsRepository, { Strength } from '@/db/repositories/strengths.repository';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@/components/Card';

const MyStrengths = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const { finishTool } = useToolManagerContext();

  // todo: loading and error
  const { data: strengths } = useLiveQuery(strengthsRepository.getStrengths(), []);

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.MY_STRENGTHS.title),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: router.back,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.done),
        onMainAction: finishTool,
        secondaryActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.add),
        onSecondaryAction: () => router.push('/tools/my-strengths/strength'),
      }}>
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
    </Screen>
  );
};

export default MyStrengths;

const StrengthItem = ({ strength, onPress }: { strength: Strength; onPress: () => void }) => {
  const { strength: strengthText, image } = strength;
  const [isPortrait, setIsPortrait] = React.useState<boolean | null>(null);

  return (
    <Card onPress={onPress}>
      {image && (
        <XStack>
          <Image
            source={{ uri: image }}
            onLoad={(e) => {
              const { width, height } = e.nativeEvent.source;
              setIsPortrait(height > width);
            }}
            objectFit='cover'
            style={{ width: '100%', borderRadius: 9, aspectRatio: isPortrait ? 9 / 16 : 16 / 9 }}
          />
        </XStack>
      )}

      {strengthText && (
        <YStack padding='$md'>
          <Typography>{strengthText}</Typography>
        </YStack>
      )}
    </Card>
  );
};
