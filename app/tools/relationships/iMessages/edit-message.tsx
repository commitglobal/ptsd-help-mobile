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
  // todo: replace this with query
  const message = messages.find((message) => message.id === messageId);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      annoyance: message?.annoyance,
      message: message?.message,
      because: message?.because,
    },
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleGoBack();
      return true;
    });

    return () => backHandler.remove();
  }, [isDirty]);

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
    console.log('data for edit 🩷: ', data);
  };

  const handleOpenDeleteMessageModal = () => {
    setDeleteMessageModalOpen(true);
  };

  const handleDeleteMessage = () => {
    setDeleteMessageModalOpen(false);
    console.log('delete message 🩷');
    router.back();
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
          title: t('relationships.tools.i-messages.edit.title'),
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
                label={t('relationships.tools.i-messages.new-message.annoyance.label')}
                placeholder={t('relationships.tools.i-messages.new-message.annoyance.placeholder')}
                ref={annoyanceRef}
                onFocus={() => handleFocus(annoyanceRef)}
                infoMessage={t('relationships.tools.i-messages.new-message.annoyance.example')}
                onInfoMessagePress={() =>
                  handleInfoModalOpen(t('relationships.tools.i-messages.new-message.annoyance.example'))
                }
                errorMessage={errors.annoyance?.message as string}
              />
            )}
          />
          <Typography>{t('relationships.tools.i-messages.new-message.declaration')}</Typography>
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
                label={t('relationships.tools.i-messages.new-message.i-feel.label')}
                placeholder={t('relationships.tools.i-messages.new-message.i-feel.placeholder')}
                ref={feelRef}
                onFocus={() => handleFocus(feelRef)}
                infoMessage={t('relationships.tools.i-messages.new-message.i-feel.example')}
                onInfoMessagePress={() =>
                  handleInfoModalOpen(t('relationships.tools.i-messages.new-message.i-feel.example'))
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
                label={t('relationships.tools.i-messages.new-message.because-input.label')}
                placeholder={t('relationships.tools.i-messages.new-message.because-input.placeholder')}
                ref={becauseRef}
                onFocus={() => handleFocus(becauseRef)}
                infoMessage={t('relationships.tools.i-messages.new-message.because-input.example')}
                onInfoMessagePress={() =>
                  handleInfoModalOpen(t('relationships.tools.i-messages.new-message.because-input.example'))
                }
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
