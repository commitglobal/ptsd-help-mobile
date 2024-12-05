import React, { useRef } from 'react';
import DatePicker from 'react-native-date-picker';
import { YStack } from 'tamagui';

interface TimePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const TimePicker = ({ date, onChange }: TimePickerProps) => {
  const ref = useRef<any>(null);

  // TODO: scroll to the time picker when the keyboard is shown, but without a keyboard listener

  return (
    <YStack ref={ref}>
      <DatePicker date={date} onDateChange={onChange} mode='time' theme='light' />
    </YStack>
  );
};
