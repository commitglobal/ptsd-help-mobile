import React, { useState } from 'react';
import { Typography } from './Typography';
import { ScreenWithImageHeader, ScreenWithImageHeaderProps } from './ScreenWithImageHeader';
import { useSendSMS } from '@/hooks/useSMS';
import { useCalendar } from '@/hooks/useCalendar';
import * as Calendar from 'expo-calendar';

interface ScreenWithChangingTextProps extends ScreenWithImageHeaderProps {
  staticText: string;
  items: { id: string; title?: string; description?: string; sms?: string; calendar?: string }[];
  children?: React.ReactNode;
}

export const ScreenWithChangingText = ({
  headerProps,
  footerProps,
  staticText,
  items,
  imageUrl,
  children,
}: ScreenWithChangingTextProps) => {
  const [renderedItem, setRenderedItem] = useState(items[0]);
  const { sendSMS } = useSendSMS();
  const { openCalendarAddEvent } = useCalendar();

  const handleNextItem = () => {
    const currentIndex = items.findIndex((item) => item.id === renderedItem.id);
    const nextIndex = (currentIndex + 1) % items.length;
    setRenderedItem(items[nextIndex]);
  };

  const handlePreviousItem = () => {
    const currentIndex = items.findIndex((item) => item.id === renderedItem.id);
    const previousIndex = (currentIndex - 1 + items.length) % items.length;
    setRenderedItem(items[previousIndex]);
  };

  const handleSendSMS = () => {
    if (renderedItem.sms) {
      sendSMS(renderedItem.sms);
    }
  };

  const handleAddEventToCalendar = async () => {
    if (renderedItem.calendar) {
      const { status, canAskAgain } = await Calendar.requestCalendarPermissionsAsync();
      console.log('status 💐', status);
      console.log('canAskAgain 💐', canAskAgain);
      if (status === 'granted') {
        const calendar = await Calendar.getDefaultCalendarAsync();
        console.log('calendar 💐', calendar);
        const eventData = {
          title: renderedItem.calendar,
          startDate: new Date(),
          endDate: new Date(),
        };
        const eventId = await Calendar.createEventAsync(calendar.id, eventData);
        console.log('eventId created 💐', eventId);
      }
    }
  };

  return (
    <ScreenWithImageHeader
      imageUrl={imageUrl}
      headerProps={headerProps}
      footerProps={{
        onPrev: handlePreviousItem,
        onNext: handleNextItem,
        onCustomAction: renderedItem.sms ? handleSendSMS : renderedItem.calendar ? handleAddEventToCalendar : undefined,
        customActionIcon: renderedItem.sms ? 'chat' : renderedItem.calendar ? 'calendar' : undefined,
        ...footerProps,
      }}>
      <Typography preset='helper'>{staticText}</Typography>
      {/* <Typography>{renderedItem.text}</Typography> */}
      {renderedItem.title && <Typography preset='subheading'>{renderedItem.title}</Typography>}
      {renderedItem.description && <Typography>{renderedItem.description}</Typography>}
      {children}
    </ScreenWithImageHeader>
  );
};
