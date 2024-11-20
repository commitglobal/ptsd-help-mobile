import React, { useState } from 'react';
import { Typography } from './Typography';
import { ScreenWithImageHeader, ScreenWithImageHeaderProps } from './ScreenWithImageHeader';

interface ScreenWithChangingTextProps extends ScreenWithImageHeaderProps {
  staticText: string;
  items: { id: string; title?: string; description?: string }[];
}

export const ScreenWithChangingText = ({
  headerProps,
  footerProps,
  staticText,
  items,
  imageUrl,
}: ScreenWithChangingTextProps) => {
  const [renderedItem, setRenderedItem] = useState(items[0]);

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

  return (
    <ScreenWithImageHeader
      imageUrl={imageUrl}
      headerProps={headerProps}
      footerProps={{ onPrev: handlePreviousItem, onNext: handleNextItem, ...footerProps }}>
      <Typography preset='helper'>{staticText}</Typography>
      {/* <Typography>{renderedItem.text}</Typography> */}
      {renderedItem.title && <Typography preset='subheading'>{renderedItem.title}</Typography>}
      {renderedItem.description && <Typography>{renderedItem.description}</Typography>}
    </ScreenWithImageHeader>
  );
};
