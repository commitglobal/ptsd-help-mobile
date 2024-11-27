import useTranslationKeys from '@/hooks/useTranslationKeys';
import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import messagesRepository from '@/db/repositories/messages.repository';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Separator, XStack } from 'tamagui';

export default function iMessages() {
  const { t } = useTranslation('tools');
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { translations } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const { data: messages, error } = useLiveQuery(messagesRepository.getMessages(), []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping ? mediaMapping['RELATIONSHIPS.I_MESSAGES.headerImage'] : ''}
        headerProps={{
          title: t(translations.RELATIONSHIPS.subcategories.I_MESSAGES.title),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        {!messages || messages.length === 0 ? (
          error ? (
            <Typography>{error.message}</Typography> // TODO: handle error differently
          ) : (
            <Typography>{t(translations.RELATIONSHIPS.subcategories.I_MESSAGES.text)}</Typography>
          )
        ) : (
          <>
            <Typography>{t(translations.RELATIONSHIPS.subcategories.I_MESSAGES.findTime)}</Typography>
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
                <Typography>{t(translations.RELATIONSHIPS.subcategories.I_MESSAGES.when)}</Typography>
                <Typography preset='helper'>{message.annoyance}</Typography>
                <Separator marginVertical={4} />
                <Typography>{t(translations.RELATIONSHIPS.subcategories.I_MESSAGES.feel)}</Typography>
                <Typography preset='helper'>{message.message}</Typography>
                <Separator marginVertical={4} />
                <Typography>{t(translations.RELATIONSHIPS.subcategories.I_MESSAGES.because)}</Typography>
                <Typography preset='helper'>{message.because}</Typography>
              </Card>
            ))}
          </>
        )}
      </ScreenWithImageHeader>

      <XStack position='absolute' bottom={insets.bottom + 16} right='$lg'>
        <Button
          icon={<Icon icon='plus' color='white' width={24} height={24} />}
          onPress={() => router.push(`/tools/relationships/iMessages/new-message`)}
        />
      </XStack>
    </>
  );
}
