import React, { useState } from 'react';
import { Typography } from './Typography';
import { ScreenWithImageHeader, ScreenWithImageHeaderProps } from './ScreenWithImageHeader';
import { useSendSMS } from '@/hooks/useSMS';

interface ScreenWithChangingTextProps extends ScreenWithImageHeaderProps {
  staticText: string;
  items: { id: string; title?: string; description?: string; sms?: string }[];
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

  return (
    <ScreenWithImageHeader
      imageUrl={imageUrl}
      headerProps={headerProps}
      footerProps={{
        onPrev: handlePreviousItem,
        onNext: handleNextItem,
        onCustomAction: renderedItem.sms ? handleSendSMS : undefined,
        customActionIcon: renderedItem.sms ? 'chat' : undefined,
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
