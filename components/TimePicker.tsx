import { scrollToItem } from '@/helpers/scrollToItem';
import React, { useEffect, useRef } from 'react';
import DatePicker from 'react-native-date-picker';
import { ScrollView, YStack } from 'tamagui';
import { Keyboard } from 'react-native';

interface TimePickerProps {
  date: Date;
  onChange: (date: Date) => void;
  // if we want to scroll to the time picker when the keyboard is shown
  scrollViewRef?: React.RefObject<ScrollView>;
}

export const TimePicker = ({ date, onChange, scrollViewRef }: TimePickerProps) => {
  const ref = useRef<any>(null);

  // scroll to the time picker when the keyboard is shown
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      if (scrollViewRef?.current) {
        scrollToItem(scrollViewRef, ref);
      }
    });

    return () => {
      keyboardWillShowListener.remove();
    };
  }, []);

  return (
    <YStack ref={ref}>
      <DatePicker date={date} onDateChange={onChange} mode='time' />
    </YStack>
  );
};
