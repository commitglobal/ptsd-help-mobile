import { Modal } from '@/components/Modal';
import { Screen } from '@/components/Screen';
import TextFormInput from '@/components/TextFormInput';
import { Typography } from '@/components/Typography';
import { router, Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, YStack } from 'tamagui';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import messagesRepository, { Message } from '@/db/repositories/messages.repository';
import { scrollToItem } from '@/helpers/scrollToItem';

export default function NewMessage() {
  const { t } = useTranslation('tools');
  const insets = useSafeAreaInsets();

  // using refs for scrolling capabilities
  const scrollViewRef = useRef<ScrollView>(null);
  const annoyanceRef = useRef(null);
  const feelRef = useRef(null);
  const becauseRef = useRef(null);

  const [infoMessage, setInfoMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFocus = (ref: React.RefObject<any>) => {
    if (ref.current) {
      scrollToItem(scrollViewRef, ref);
    }
  };

  const handleInfoModalOpen = (message: string) => {
    setInfoMessage(message);
  };

  const handleInfoModalClose = () => {
    setInfoMessage('');
  };

  const onSubmit = async (data: any) => {
    try {
      await messagesRepository.createMessage(data as Message);
      router.back();
    } catch (error) {
      console.error('Error inserting message:', error);
    }
  };

  const { toolsTranslationKeys } = useTranslationKeys();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.title),
          iconRight: (
            <Typography color='$gray12' fontWeight='bold'>
              {t('general.done', { ns: 'translation' })}
            </Typography>
          ),
          onRightPress: handleSubmit(onSubmit),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: router.back,
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          paddingBottom: insets.bottom,
        }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            gap: '$lg',
            flexGrow: 1,
            padding: '$lg',
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            name='annoyance'
            rules={{
              required: {
                value: true,
                message: t('general.required', { ns: 'translation' }),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextFormInput
                value={value}
                onChange={onChange}
                label={t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.annoyance.label)}
                placeholder={t(
                  toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.annoyance.placeholder
                )}
                ref={annoyanceRef}
                onFocus={() => handleFocus(annoyanceRef)}
                infoMessage={t(
                  toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.annoyance.example
                )}
                onInfoMessagePress={() =>
                  handleInfoModalOpen(
                    t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.annoyance.example)
                  )
                }
                errorMessage={errors.annoyance?.message as string}
              />
            )}
          />
          <Typography>
            {t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.declaration)}
          </Typography>
          <Controller
            control={control}
            name='message'
            rules={{
              required: {
                value: true,
                message: t('general.required', { ns: 'translation' }),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextFormInput
                value={value}
                onChange={onChange}
                label={t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.iFeel.label)}
                placeholder={t(
                  toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.iFeel.placeholder
                )}
                ref={feelRef}
                onFocus={() => handleFocus(feelRef)}
                infoMessage={t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.iFeel.example)}
                onInfoMessagePress={() =>
                  handleInfoModalOpen(
                    t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.iFeel.example)
                  )
                }
                errorMessage={errors.feel?.message as string}
              />
            )}
          />
          <Controller
            control={control}
            name='because'
            rules={{
              required: {
                value: true,
                message: t('general.required', { ns: 'translation' }),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextFormInput
                value={value}
                onChange={onChange}
                label={t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.becauseInput.label)}
                placeholder={t(
                  toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.becauseInput.placeholder
                )}
                ref={becauseRef}
                onFocus={() => handleFocus(becauseRef)}
                infoMessage={t(
                  toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.becauseInput.example
                )}
                onInfoMessagePress={() =>
                  handleInfoModalOpen(
                    t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.becauseInput.example)
                  )
                }
                errorMessage={errors.because?.message as string}
              />
            )}
          />
        </ScrollView>
      </Screen>
      {infoMessage && (
        <Modal open onOpenChange={handleInfoModalClose}>
          <YStack minHeight={100}>
            <Typography>{infoMessage}</Typography>
          </YStack>
        </Modal>
      )}
    </>
  );
}
