import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { Screen } from '@/components/Screen';
import TextFormInput from '@/components/TextFormInput';
import { Typography } from '@/components/Typography';
import { scrollToTextarea } from '@/helpers/scrollToTextarea';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BackHandler, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, XStack, YStack } from 'tamagui';
import { useMessage } from '@/services/messages.service';
import repository from '@/db/repository';

export default function Message() {
  const { t } = useTranslation('tools');

  const insets = useSafeAreaInsets();

  // using refs for scrolling capabilities
  const scrollViewRef = useRef<ScrollView>(null);
  const annoyanceRef = useRef(null);
  const feelRef = useRef(null);
  const becauseRef = useRef(null);

  const [infoMessage, setInfoMessage] = useState('');
  const [unsavedDataModalOpen, setUnsavedDataModalOpen] = useState(false);
  const [deleteMessageModalOpen, setDeleteMessageModalOpen] = useState(false);

  const { messageId } = useLocalSearchParams();

  // TODO: handle error and loading
  const { data: message } = useMessage(Number(messageId));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleGoBack();
      return true;
    });

    return () => backHandler.remove();
  }, [isDirty]);

  useEffect(() => {
    if (message) {
      reset({
        annoyance: message.annoyance,
        message: message.message,
        because: message.because,
      });
    }
  }, [message]);

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
      await repository.updateMessage(Number(messageId), data);
      router.back();
    } catch (error) {
      console.error('Error updating message', error);
    }
  };

  const handleOpenDeleteMessageModal = () => {
    setDeleteMessageModalOpen(true);
  };

  const handleDeleteMessage = async () => {
    setDeleteMessageModalOpen(false);
    try {
      await repository.deleteMessage(Number(messageId));
      router.back();
    } catch (error) {
      console.error('Error deleting message', error);
    }
  };

  const handleGoBack = () => {
    if (isDirty) {
      Keyboard.dismiss();
      setUnsavedDataModalOpen(true);
    } else {
      router.back();
    }
  };

  const translationsKeys = TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.I_MESSAGES;

  return (
    <>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false, fullScreenGestureEnabled: false }} />
      <Screen
        headerProps={{
          title: t(translationsKeys.edit.title),
          iconLeft: <Icon icon='x' color='white' width={24} height={24} />,
          onLeftPress: handleGoBack,
          iconRight: <Typography color='white'>{t('common.save', { ns: 'translation' })}</Typography>,
          onRightPress: handleSubmit(onSubmit),
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
        }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            gap: '$lg',
            flexGrow: 1,
            padding: '$lg',
            paddingBottom: insets.bottom + 16,
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
                label={t(translationsKeys.newMessage.annoyance.label)}
                placeholder={t(translationsKeys.newMessage.annoyance.placeholder)}
                ref={annoyanceRef}
                onFocus={() => handleFocus(annoyanceRef)}
                infoMessage={t(translationsKeys.newMessage.annoyance.example)}
                onInfoMessagePress={() => handleInfoModalOpen(t(translationsKeys.newMessage.annoyance.example))}
                errorMessage={errors.annoyance?.message as string}
              />
            )}
          />
          <Typography>{t(translationsKeys.newMessage.declaration)}</Typography>
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
                label={t(translationsKeys.newMessage.iFeel.label)}
                placeholder={t(translationsKeys.newMessage.iFeel.placeholder)}
                ref={feelRef}
                onFocus={() => handleFocus(feelRef)}
                infoMessage={t(translationsKeys.newMessage.iFeel.example)}
                onInfoMessagePress={() => handleInfoModalOpen(t(translationsKeys.newMessage.iFeel.example))}
                errorMessage={errors.message?.message as string}
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
                label={t(translationsKeys.newMessage.becauseInput.label)}
                placeholder={t(translationsKeys.newMessage.becauseInput.placeholder)}
                ref={becauseRef}
                onFocus={() => handleFocus(becauseRef)}
                infoMessage={t(translationsKeys.newMessage.becauseInput.example)}
                onInfoMessagePress={() => handleInfoModalOpen(t(translationsKeys.newMessage.becauseInput.example))}
                errorMessage={errors.because?.message as string}
              />
            )}
          />
          <Button onPress={handleOpenDeleteMessageModal}>{t('common.delete', { ns: 'translation' })}</Button>
        </ScrollView>
      </Screen>
      {infoMessage && (
        <Modal open onOpenChange={handleInfoModalClose}>
          <YStack minHeight={100}>
            <Typography>{infoMessage}</Typography>
          </YStack>
        </Modal>
      )}
      {unsavedDataModalOpen && <UnsavedDataModal setUnsavedDataModalOpen={setUnsavedDataModalOpen} />}
      {deleteMessageModalOpen && (
        <Modal open onOpenChange={setDeleteMessageModalOpen}>
          <YStack minHeight={100}>
            <Typography>{t('common.delete-confirmation', { ns: 'translation' })}</Typography>
            <XStack justifyContent='flex-end' gap='$md'>
              <Button preset='chromeless' onPress={() => setDeleteMessageModalOpen(false)}>
                {t('common.no', { ns: 'translation' })}
              </Button>
              <Button preset='chromeless' textStyle={{ color: 'red' }} onPress={handleDeleteMessage}>
                {t('common.yes', { ns: 'translation' })}
              </Button>
            </XStack>
          </YStack>
        </Modal>
      )}
    </>
  );
}

const UnsavedDataModal = ({ setUnsavedDataModalOpen }: { setUnsavedDataModalOpen: (open: boolean) => void }) => {
  const { t } = useTranslation('i-messages');
  return (
    <Modal open onOpenChange={setUnsavedDataModalOpen}>
      <YStack minHeight={100} gap='$md'>
        <Typography>{t('common.unsaved-data', { ns: 'translation' })}</Typography>
        <XStack justifyContent='flex-end' gap='$md'>
          <Button preset='chromeless' onPress={() => setUnsavedDataModalOpen(false)}>
            {t('common.discard', { ns: 'translation' })}
          </Button>
          <Button preset='chromeless' textStyle={{ color: 'red' }} onPress={() => router.back()}>
            {t('common.sure', { ns: 'translation' })}
          </Button>
        </XStack>
      </YStack>
    </Modal>
  );
};
