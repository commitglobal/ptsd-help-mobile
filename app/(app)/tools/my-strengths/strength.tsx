import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { ScrollView, Spinner, YStack } from 'tamagui';
import TextFormInput from '@/components/TextFormInput';
import { handleTextareaFocus } from '@/helpers/handleTextareaFocus';
import { TextInput } from 'react-native';
import { pickImageFromLibrary, takePicture } from '@/common/utils/camera';
import { BottomSheet } from '@/components/BottomSheet';
import { Typography } from '@/components/Typography';
import { ImageFormInput } from '@/components/ImageFormInput';
import strengthsRepository from '@/db/repositories/strengths.repository';
import { Modal } from '@/components/Modal';
import { useStrength } from '@/services/strengths.service';
import { Image } from 'expo-image';
import { blurhash } from '@/helpers/blurhash';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
const Strength = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const textareaRef = useRef<TextInput>(null);

  const { id: strengthId } = useLocalSearchParams();
  const { data: strengthData, isLoading: isLoadingStrength } = useStrength(Number(strengthId));

  // sync state with strength in case it comes from dbs
  useEffect(() => {
    if (strengthData) {
      setText(strengthData.strength || '');
      setImage(strengthData.image || null);
    }
  }, [strengthData]);

  const [image, setImage] = useState<string | null>(strengthData?.image || null);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  const [text, setText] = useState(strengthData?.strength || '');

  const canSubmit = useMemo(() => image || text.trim().length > 0, [image, text]);

  const [optionsSheetOpen, setOptionsSheetOpen] = useState(false);
  const [imageOptionsSheetOpen, setImageOptionsSheetOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);

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

  const handleAddStrength = async () => {
    await strengthsRepository.createStrength({
      strength: text,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    });
    router.back();
  };

  const handleEditStrength = async () => {
    try {
      await strengthsRepository.updateStrength(Number(strengthId), {
        strength: text,
        image,
        updatedAt: new Date().toISOString(),
        createdAt: strengthData?.createdAt || new Date().toISOString(),
        deletedAt: strengthData?.deletedAt || null,
      });
      router.back();
    } catch (error) {
      console.error('Error editing strength', error);
    }
  };

  const handleDelete = async () => {
    try {
      await strengthsRepository.deleteStrength(Number(strengthId));
      router.back();
    } catch (error) {
      console.error('Error deleting strength', error);
    }
  };

  return (
    <>
      <Screen
        headerProps={{
          title: strengthId ? t(toolsTranslationKeys.MY_STRENGTHS.titleEdit) : t(toolsTranslationKeys.MY_STRENGTHS.add),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: router.back,
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.MY_STRENGTHS.done),
          onMainAction: strengthId ? handleEditStrength : handleAddStrength,
          mainActionDisabled: !canSubmit,
          secondaryActionLabel: strengthId ? t(toolsTranslationKeys.MY_STRENGTHS.delete) : undefined,
          onSecondaryAction: strengthId ? () => setIsDeleteConfirmationModalOpen(true) : undefined,
        }}>
        {isLoadingStrength ? (
          <YStack>
            <Spinner />
          </YStack>
        ) : (
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
              value={text}
              onChangeText={setText}
              infoMessage={t(toolsTranslationKeys.MY_STRENGTHS.info)}
              onInfoMessagePress={() => setIsInfoModalOpen(true)}
            />
            {image ? (
              <>
                <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.pickImage)}</Typography>
                <YStack
                  alignItems='center'
                  justifyContent='center'
                  onPress={() => setImageOptionsSheetOpen(true)}
                  pressStyle={{ opacity: 0.8 }}>
                  <Image
                    source={{ uri: image }}
                    onLoad={(e) => {
                      const { width, height } = e.source;
                      setIsPortrait(height > width);
                    }}
                    placeholder={{ blurhash }}
                    contentFit='cover'
                    style={{ width: '100%', borderRadius: 9, aspectRatio: isPortrait ? 9 / 16 : 16 / 9 }}
                    transition={1000}
                  />
                </YStack>
              </>
            ) : (
              <ImageFormInput
                label={t(toolsTranslationKeys.MY_STRENGTHS.pickImage)}
                onPress={() => setOptionsSheetOpen(true)}
              />
            )}
          </ScrollView>
        )}
      </Screen>
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal setModalOpen={setIsDeleteConfirmationModalOpen} handleDelete={handleDelete} />
      )}

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
      {isInfoModalOpen && (
        <Modal open onOpenChange={(open) => setIsInfoModalOpen(open)}>
          <YStack minHeight={100}>
            <Typography>{t(toolsTranslationKeys.MY_STRENGTHS.info)}</Typography>
          </YStack>
        </Modal>
      )}
    </>
  );
};

export default Strength;

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
