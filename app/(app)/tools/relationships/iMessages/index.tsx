import useTranslationKeys from '@/hooks/useTranslationKeys';
import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { GenericError } from '@/components/GenericError';
import { Icon } from '@/components/Icon';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import messagesRepository, { Message } from '@/db/repositories/messages.repository';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Separator, Spinner, XStack, YStack } from 'tamagui';

export default function IMessages() {
  const { t } = useTranslation('tools');
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { toolsTranslationKeys } = useTranslationKeys();
  const { mediaMapping } = useAssetsManagerContext();

  const { data: messages, error, updatedAt } = useLiveQuery(messagesRepository.getMessages(), []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapping ? mediaMapping['RELATIONSHIPS.I_MESSAGES.headerImage'] : ''}
        headerProps={{
          title: t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.title),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        {updatedAt === undefined ? (
          // loading state
          <YStack flex={1}>
            <Spinner color='$blue11' size='large' />
          </YStack>
        ) : error ? (
          // error state
          <GenericError errorMessage={error.message} />
        ) : messages.length === 0 ? (
          // empty state
          <Typography>{t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.text)}</Typography>
        ) : (
          // content state
          <>
            <Typography>{t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.findTime)}</Typography>
            {messages.map((message) => (
              <MessageCard message={message} key={message.id} />
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

const MessageCard = ({ message }: { message: Message }) => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  return (
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
      <Typography>{t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.when)}</Typography>
      <Typography preset='helper'>{message.annoyance}</Typography>
      <Separator marginVertical={4} />
      <Typography>{t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.feel)}</Typography>
      <Typography preset='helper'>{message.message}</Typography>
      <Separator marginVertical={4} />
      <Typography>{t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.because)}</Typography>
      <Typography preset='helper'>{message.because}</Typography>
    </Card>
  );
};
