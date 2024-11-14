import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import ScreenWithParallaxImageHeader from '@/components/ScreenWithParallaxImageHeader';
import { Typography } from '@/components/Typography';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Separator, XStack } from 'tamagui';

export default function iMessages() {
  const { t } = useTranslation('tools');
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const messages = [
    {
      id: '1',
      annoyance: "Doesn't want to go to the movies",
      message: 'sad',
      because: 'I want to go to the movies',
    },
    {
      id: '2',
      annoyance: "Interrupts me when I'm speaking",
      message: 'frustrated',
      because: "I feel like my thoughts aren't being valued",
    },
    {
      id: '3',
      annoyance: 'Is always late to our meetings',
      message: 'disrespected',
      because: 'my time is important too',
    },
    {
      id: '4',
      annoyance: 'Makes plans without consulting me',
      message: 'hurt',
      because: 'I want to be included in decisions that affect us both',
    },
    {
      id: '5',
      annoyance: "Doesn't help with household chores",
      message: 'overwhelmed',
      because: 'I need support in maintaining our shared space',
    },
    {
      id: '6',
      annoyance: 'Spends too much time on their phone',
      message: 'lonely',
      because: 'I want to connect and spend quality time together',
    },
  ];

  return (
    <>
      <ScreenWithParallaxImageHeader
        headerImage={
          <Image source={require('@/assets/images/old-couple.png')} style={{ width: '100%', height: 250 }} />
        }
        headerProps={{
          title: t('relationships.tools.i-messages.title'),
          iconLeft: <Icon icon='chevronLeft' color='white' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}>
        {!messages || messages.length === 0 ? (
          <Typography>{t('i-messages.text')}</Typography>
        ) : (
          <>
            <Typography>{t('relationships.tools.i-messages.find-time')}</Typography>
            {messages.map((message) => (
              <Card
                key={message.id}
                padding='$md'
                gap={4}
                onPress={() =>
                  router.push({
                    pathname: `/tools/relationships/iMessages/edit-message`,
                    params: { messageId: message.id },
                  })
                }>
                <Typography>{t('relationships.tools.i-messages.when')}</Typography>
                <Typography preset='helper'>{message.annoyance}</Typography>
                <Separator marginVertical={4} />
                <Typography>{t('relationships.tools.i-messages.feel')}</Typography>
                <Typography preset='helper'>{message.message}</Typography>
                <Separator marginVertical={4} />
                <Typography>{t('relationships.tools.i-messages.because')}</Typography>
                <Typography preset='helper'>{message.because}</Typography>
              </Card>
            ))}
          </>
        )}
      </ScreenWithParallaxImageHeader>

      <XStack position='absolute' bottom={insets.bottom + 16} right='$lg'>
        <Button
          icon={<Icon icon='plus' color='white' width={24} height={24} />}
          onPress={() => router.push(`/tools/relationships/iMessages/new-message`)}
        />
      </XStack>
    </>
  );
}
