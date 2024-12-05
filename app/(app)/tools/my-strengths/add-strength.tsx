import React, { useRef, useState } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { ScrollView, YStack } from 'tamagui';
import TextFormInput from '@/components/TextFormInput';
import { TextInput } from 'react-native';
import { handleTextareaFocus } from '@/helpers/handleTextareaFocus';
import Button from '@/components/Button';
import { Image } from 'react-native';
import { pickImageFromLibrary, takePicture } from '@/common/utils/camera';
import { BottomSheet } from '@/components/BottomSheet';
import { Typography } from '@/components/Typography';
import { ImageFormInput } from '@/components/ImageFormInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AddStrength = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>(null);
  const textareaRef = useRef<TextInput>(null);

  const [libraryImage, setLibraryImage] = useState<string | null>(null);
  const [cameraImage, setCameraImage] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handlePickImageFromLibrary = async () => {
    setSheetOpen(false);
    const image = await pickImageFromLibrary();
    if (image) {
      setLibraryImage(image);
    }
  };

  const handleTakePicture = async () => {
    setSheetOpen(false);
    const image = await takePicture();
    if (image) {
      setCameraImage(image);
    }
  };

  // todo: either one of picture/text before submitting

  return (
    <>
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.MY_STRENGTHS.add),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} color='$gray12' />,
          onLeftPress: router.back,
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
          />
          <ImageFormInput label={'IMAGE'} onPress={() => setSheetOpen(true)} />
        </ScrollView>
      </Screen>

      {sheetOpen && (
        <OptionsSheet
          onOpenChange={setSheetOpen}
          handleTakePicture={handleTakePicture}
          handlePickImageFromLibrary={handlePickImageFromLibrary}
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
  const insets = useSafeAreaInsets();
  return (
    <BottomSheet onOpenChange={onOpenChange} snapPointsMode='fit' frameProps={{ paddingBottom: insets.bottom + 16 }}>
      <YStack paddingVertical='$md' pressStyle={{ opacity: 0.5 }} onPress={handleTakePicture}>
        <Typography>Take a picture</Typography>
      </YStack>
      <YStack paddingVertical='$md' pressStyle={{ opacity: 0.5 }} onPress={handlePickImageFromLibrary}>
        <Typography>Pick an image from the library</Typography>
      </YStack>
    </BottomSheet>
  );
};
