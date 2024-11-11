import { Platform, Linking } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

export const useCalendar = () => {
  const openCalendarAddEvent = ({ title, location, startDate, endDate }: { title: string, location: string, startDate: Date, endDate: Date }) => {
    if (Platform.OS === 'ios') {
        // Just calendar Open for iOS
        const iosCalendarEpoch = new Date('2001-01-01T00:00:00Z').getTime();
        const eventTimeInSeconds = Math.floor((startDate.getTime() - iosCalendarEpoch) / 1000);
        const url = `calshow:${eventTimeInSeconds}`;
  
        Linking.openURL(url).catch(err => console.error('Failed to open calendar on iOS:', err));
      } else if (Platform.OS === 'android') {
        
        const startMs = startDate.getTime();
        const endMs = endDate.getTime();
  
        const intentParams = {
          action: 'android.intent.action.INSERT',
          data: 'content://com.android.calendar/events',
          extra: {
            'title': title,
            'eventLocation': location,
            'beginTime': startMs,
            'endTime': endMs,
          },
        };
  
        IntentLauncher.startActivityAsync('android.intent.action.INSERT', intentParams).catch(err =>
          console.error('Failed to open calendar on Android:', err)
        );
      }
  };

  return { openCalendarAddEvent };
};
