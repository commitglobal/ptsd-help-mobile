import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export const pickImageFromLibrary = async () => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  // Save the image to the file system:
  // because by default the image is saved inside a temporary directory that could be deleted by the system
  // we create a copy of the image inside a permanent directory (from result.assets[0].uri ->  permanentUri)
  if (!result.canceled) {
    const permanentUri = `${FileSystem.documentDirectory}${result.assets[0].uri.split('/').pop()}`; // getting the name of the file
    await FileSystem.copyAsync({ from: result.assets[0].uri, to: permanentUri });
    return permanentUri;
  }
};

export const takePicture = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    return;
  }
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  // Save the image to the file system:
  // because by default the image is saved inside a temporary directory that could be deleted by the system
  // we create a copy of the image inside a permanent directory (from result.assets[0].uri ->  permanentUri)
  if (!result.canceled) {
    const permanentUri = `${FileSystem.documentDirectory}${result.assets[0].uri.split('/').pop()}`; // getting the name of the file
    await FileSystem.copyAsync({ from: result.assets[0].uri, to: permanentUri });
    return permanentUri;
  }
};
