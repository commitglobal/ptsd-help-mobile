import { Linking, Platform } from 'react-native';

export const useSendSMS = () => {
  const sendSMS = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `sms:${Platform.OS === 'ios' ? '&' : '?'}body=${encodedMessage}`;
    Linking.openURL(url).catch((err) => console.error('Failed to open SMS app on iOS:', err));
  };

  return { sendSMS };
};
