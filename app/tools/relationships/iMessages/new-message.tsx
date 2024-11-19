import { Modal } from '@/components/Modal';
import { Screen } from '@/components/Screen';
import TextFormInput from '@/components/TextFormInput';
import { Typography } from '@/components/Typography';
import { scrollToTextarea } from '@/helpers/scrollToTextarea';
import { router, Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, YStack } from 'tamagui';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import repository, { Message } from '@/db/repository';

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
      scrollToTextarea(scrollViewRef, ref);
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
      await repository.createMessage(data as Message);
      router.back();
    } catch (error) {
      console.error('Error inserting message:', error);
    }
  };

  const translationsKeys = TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{
          title: t(translationsKeys.title),
          iconRight: <Typography color='white'>{t('general.done', { ns: 'translation' })}</Typography>,
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
                label={t(translationsKeys.annoyance.label)}
                placeholder={t(translationsKeys.annoyance.placeholder)}
                ref={annoyanceRef}
                onFocus={() => handleFocus(annoyanceRef)}
                infoMessage={t(translationsKeys.annoyance.example)}
                onInfoMessagePress={() => handleInfoModalOpen(t(translationsKeys.annoyance.example))}
                errorMessage={errors.annoyance?.message as string}
              />
            )}
          />
          <Typography>{t(translationsKeys.declaration)}</Typography>
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
                label={t(translationsKeys.iFeel.label)}
                placeholder={t(translationsKeys.iFeel.placeholder)}
                ref={feelRef}
                onFocus={() => handleFocus(feelRef)}
                infoMessage={t(translationsKeys.iFeel.example)}
                onInfoMessagePress={() => handleInfoModalOpen(t(translationsKeys.iFeel.example))}
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
                label={t(translationsKeys.becauseInput.label)}
                placeholder={t(translationsKeys.becauseInput.placeholder)}
                ref={becauseRef}
                onFocus={() => handleFocus(becauseRef)}
                infoMessage={t(translationsKeys.becauseInput.example)}
                onInfoMessagePress={() => handleInfoModalOpen(t(translationsKeys.becauseInput.example))}
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
