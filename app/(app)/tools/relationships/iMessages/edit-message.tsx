import useTranslationKeys from '@/hooks/useTranslationKeys';
import Button from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { Screen } from '@/components/Screen';
import TextFormInput from '@/components/TextFormInput';
import { Typography } from '@/components/Typography';
import { scrollToItem } from '@/helpers/scrollToItem';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BackHandler, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, XStack, YStack } from 'tamagui';
import { useMessage } from '@/services/messages.service';
import messagesRepository from '@/db/repositories/messages.repository';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';

export default function Message() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
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
      await messagesRepository.updateMessage(Number(messageId), data);
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
      await messagesRepository.deleteMessage(Number(messageId));
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

  return (
    <>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false, fullScreenGestureEnabled: false }} />
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.edit.title),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: handleGoBack,
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.RELATIONSHIPS.subcategories.I_MESSAGES.newMessage.save),
          onMainAction: handleSubmit(onSubmit),
          secondaryActionLabel: t('common.delete', { ns: 'translation' }),
          onSecondaryAction: handleOpenDeleteMessageModal,
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
      {unsavedDataModalOpen && <UnsavedDataModal setUnsavedDataModalOpen={setUnsavedDataModalOpen} />}
      {deleteMessageModalOpen && (
        <DeleteConfirmationModal setModalOpen={setDeleteMessageModalOpen} handleDelete={handleDeleteMessage} />
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
