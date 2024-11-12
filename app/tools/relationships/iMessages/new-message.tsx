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

export default function NewMessage() {
  const { t } = useTranslation(['i-messages', 'general']);
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

  const onSubmit = (data: any) => {
    console.log('data 🩷: ', data);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen
        headerProps={{
          title: "Messages with 'I'",
          iconRight: <Typography color='white'>{t('done', { ns: 'general' })}</Typography>,
          onRightPress: handleSubmit(onSubmit),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='white' />,
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
                message: t('required', { ns: 'general' }),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextFormInput
                value={value}
                onChange={onChange}
                label={t('annoyance.label')}
                placeholder={t('annoyance.placeholder')}
                ref={annoyanceRef}
                onFocus={() => handleFocus(annoyanceRef)}
                infoMessage={t('annoyance.example')}
                onInfoMessagePress={() => handleInfoModalOpen(t('annoyance.example'))}
                errorMessage={errors.annoyance?.message as string}
              />
            )}
          />
          <Typography>{t('declaration')}</Typography>
          <Controller
            control={control}
            name='feel'
            rules={{
              required: {
                value: true,
                message: t('required', { ns: 'general' }),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextFormInput
                value={value}
                onChange={onChange}
                label={t('i-feel.label')}
                placeholder={t('i-feel.placeholder')}
                ref={feelRef}
                onFocus={() => handleFocus(feelRef)}
                infoMessage={t('i-feel.example')}
                onInfoMessagePress={() => handleInfoModalOpen(t('i-feel.example'))}
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
                message: t('required', { ns: 'general' }),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <TextFormInput
                value={value}
                onChange={onChange}
                label={t('because-input.label')}
                placeholder={t('because-input.placeholder')}
                ref={becauseRef}
                onFocus={() => handleFocus(becauseRef)}
                infoMessage={t('because-input.example')}
                onInfoMessagePress={() => handleInfoModalOpen(t('because-input.example'))}
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
