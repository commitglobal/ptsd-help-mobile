import React, { useMemo, useRef, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { ScrollView, YStack } from 'tamagui';
import TextFormInput from '@/components/TextFormInput';
import { handleTextareaFocus } from '@/helpers/handleTextareaFocus';
import { Image, TextInput } from 'react-native';
import { pickImageFromLibrary, takePicture } from '@/common/utils/camera';
import { BottomSheet } from '@/components/BottomSheet';
import { Typography } from '@/components/Typography';
import { ImageFormInput } from '@/components/ImageFormInput';
import strengthsRepository from '@/db/repositories/strengths.repository';

const AddStrength = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const textareaRef = useRef<TextInput>(null);

  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');

  const canSubmit = useMemo(() => image || text.trim().length > 0, [image, text]);

  const [optionsSheetOpen, setOptionsSheetOpen] = useState(false);
  const [imageOptionsSheetOpen, setImageOptionsSheetOpen] = useState(false);

  const handlePickImageFromLibrary = async () => {
    setOptionsSheetOpen(false);
    const image = await pickImageFromLibrary();
    if (image) {
      setImage(image);
    }
  };

  const handleTakePicture = async () => {
    setOptionsSheetOpen(false);
    const image = await takePicture();
    if (image) {
      setImage(image);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImageOptionsSheetOpen(false);
  };

  const handleModifyImage = () => {
    setImageOptionsSheetOpen(false);
    setOptionsSheetOpen(true);
  };

  const handleSubmit = async () => {
    await strengthsRepository.createStrength({
      strength: text,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    });
    router.back();
  };

  return (
    <>
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.MY_STRENGTHS.add),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: router.back,
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.done),
          onMainAction: handleSubmit,
          mainActionDisabled: !canSubmit,
        }}>
        <ScrollView
          ref={scrollViewRef}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: '$md', gap: '$md' }}>
          <TextFormInput
            ref={textareaRef}
            label={t(toolsTranslationKeys.MY_STRENGTHS.strengthLabel)}
            placeholder={t(toolsTranslationKeys.MY_STRENGTHS.placeholder)}
            onFocus={() => handleTextareaFocus(scrollViewRef, textareaRef)}
            onChangeText={setText}
          />
          {image ? (
            <>
              <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.pickImage)}</Typography>
              <YStack
                alignItems='center'
                justifyContent='center'
                backgroundColor='white'
                borderRadius={9}
                padding='$md'
                onPress={() => setImageOptionsSheetOpen(true)}
                pressStyle={{ opacity: 0.8 }}>
                <Image source={{ uri: image }} resizeMode='contain' style={{ width: '100%', height: 400 }} />
              </YStack>
            </>
          ) : (
            <ImageFormInput
              label={t(toolsTranslationKeys.MY_STRENGTHS.pickImage)}
              onPress={() => setOptionsSheetOpen(true)}
            />
          )}
        </ScrollView>
      </Screen>

      {optionsSheetOpen && (
        <OptionsSheet
          onOpenChange={setOptionsSheetOpen}
          handleTakePicture={handleTakePicture}
          handlePickImageFromLibrary={handlePickImageFromLibrary}
        />
      )}
      {imageOptionsSheetOpen && (
        <ImageOptionsSheet
          onOpenChange={setImageOptionsSheetOpen}
          handleDeleteImage={handleDeleteImage}
          handleModifyImage={handleModifyImage}
        />
      )}
    </>
  );
};

export default AddStrength;

const OptionsSheet = ({
  onOpenChange,
  handleTakePicture,
  handlePickImageFromLibrary,
}: {
  onOpenChange: (open: boolean) => void;
  handleTakePicture: () => void;
  handlePickImageFromLibrary: () => void;
}) => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  return (
    <BottomSheet onOpenChange={onOpenChange} snapPointsMode='fit'>
      <YStack paddingVertical='$md' pressStyle={{ opacity: 0.5 }} onPress={handleTakePicture}>
        <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.takePicture)}</Typography>
      </YStack>
      <YStack paddingVertical='$md' pressStyle={{ opacity: 0.5 }} onPress={handlePickImageFromLibrary}>
        <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.pickFromLibrary)}</Typography>
      </YStack>
    </BottomSheet>
  );
};

const ImageOptionsSheet = ({
  onOpenChange,
  handleDeleteImage,
  handleModifyImage,
}: {
  onOpenChange: (open: boolean) => void;
  handleDeleteImage: () => void;
  handleModifyImage: () => void;
}) => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  return (
    <BottomSheet onOpenChange={onOpenChange} snapPointsMode='fit'>
      <YStack paddingVertical='$md' pressStyle={{ opacity: 0.5 }} onPress={handleModifyImage}>
        <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.modifyImage)}</Typography>
      </YStack>
      <YStack paddingVertical='$md' pressStyle={{ opacity: 0.5 }} onPress={handleDeleteImage}>
        <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.deleteImage)}</Typography>
      </YStack>
    </BottomSheet>
  );
};
