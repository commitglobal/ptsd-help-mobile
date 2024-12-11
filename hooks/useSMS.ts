import { Linking, Platform } from 'react-native';

export const useSendSMS = () => {
  const sendSMS = (message: string) => {
    const encodedMessage = encodeURIComponent(message);

    if (Platform.OS === 'ios') {
      // For iOS, use sms: URL scheme with the body parameter
      const url = `sms:&body=${encodedMessage}`;
      Linking.openURL(url).catch((err) => console.error('Failed to open SMS app on iOS:', err));
    } else if (Platform.OS === 'android') {
      // For Android, use sms: URL scheme with the body parameter
      const url = `sms:?body=${encodedMessage}`;
      Linking.openURL(url).catch((err) => console.error('Failed to open SMS app on Android:', err));
    }
  };

  return { sendSMS };
};
