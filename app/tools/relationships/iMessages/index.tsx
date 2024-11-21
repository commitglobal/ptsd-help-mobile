import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { ScreenWithImageHeader } from '@/components/ScreenWithImageHeader';
import { Typography } from '@/components/Typography';
import messagesRepository, { Message } from '@/db/repositories/messages.repository';
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

  const translationsKeys = TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.I_MESSAGES;
  const mediaMapper = TOOLS_MEDIA_MAPPER.RELATIONSHIPS.I_MESSAGES;

  const { data: messages, error } = useLiveQuery(messagesRepository.getMessages(), []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithImageHeader
        imageUrl={mediaMapper.headerImageURI}
        headerProps={{
          title: t(translationsKeys.title),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
        {!messages || messages.length === 0 ? (
          error ? (
            <Typography>{error.message}</Typography> // TODO: handle error differently
          ) : (
            <Typography>{t(translationsKeys.text)}</Typography>
          )
        ) : (
          <>
            <Typography>{t(translationsKeys.findTime)}</Typography>
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
  const translationsKeys = TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.I_MESSAGES;
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
      <Typography>{t(translationsKeys.when)}</Typography>
      <Typography preset='helper'>{message.annoyance}</Typography>
      <Separator marginVertical={4} />
      <Typography>{t(translationsKeys.feel)}</Typography>
      <Typography preset='helper'>{message.message}</Typography>
      <Separator marginVertical={4} />
      <Typography>{t(translationsKeys.because)}</Typography>
      <Typography preset='helper'>{message.because}</Typography>
    </Card>
  );
};
