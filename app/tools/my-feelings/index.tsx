import React from 'react';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import feelingsRepository, { Feeling } from '@/db/repositories/feelings.repository';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Typography } from '@/components/Typography';
import { Separator, XStack, YStack } from 'tamagui';
import { Card } from '@/components/Card';
import { format } from 'date-fns';

export default function MyFeelings() {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const { finishTool } = useToolManagerContext();

  const translationKey = TOOLS_TRANSLATIONS_CONFIG.MY_FEELINGS;

  // TODO: loading & error
  const { data: feelings } = useLiveQuery(feelingsRepository.getFeelings(), []);

  return (
    <ScreenWithImageHeader
      imageUrl={require('@/assets/images/tools/my-feelings/my_feelings.jpg')}
      headerProps={{
        title: t(translationKey.label),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        mainActionLabel: t(translationKey.mainActionLabel),
        onMainAction: () => router.push('/tools/my-feelings/choose-main-feelings'),
        secondaryActionLabel: t(translationKey.done),
        onSecondaryAction: finishTool,
      }}>
      {/* empty state */}
      {!feelings || feelings.length === 0 ? <Typography>{t(translationKey.noFeelings)}</Typography> : null}

      {/* feelings cards */}
      {feelings.map((feeling) => (
        <FeelingCard feeling={feeling} key={feeling.id} />
      ))}
    </ScreenWithImageHeader>
  );
}

const FeelingCard = ({ feeling }: { feeling: Feeling }) => {
  return (
    <Card padding='$md'>
      <YStack gap='$md'>
        {/* stress section */}
        <XStack>
          <XStack flex={0.3} justifyContent='center' alignItems='center'>
            <Typography preset='heading'>{`${feeling.disconfort}%`}</Typography>
          </XStack>
          <YStack flex={0.7}>
            <Typography>Stress: ....</Typography>
            <Typography preset='helper'>{format(new Date(feeling.createdAt), 'EEEE, MMM. d, yyyy')}</Typography>
          </YStack>
        </XStack>

        <Separator />

        {/* feelings section */}
        <YStack gap='$xs'>
          {feeling.feelings.map((feeling) => (
            <XStack key={feeling.mainFeeling}>
              <Typography flex={0.3} preset='subheading' color='$blue11' textAlign='center'>
                {feeling.mainFeeling}
              </Typography>

              {feeling.secondaryFeelings.length !== 0 && (
                <Typography flex={0.7}>{feeling.secondaryFeelings.join(', ')}</Typography>
              )}
            </XStack>
          ))}
        </YStack>
      </YStack>
    </Card>
  );
};
