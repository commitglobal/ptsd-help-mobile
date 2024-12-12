import { scrollToItem } from './scrollToItem';

export const handleTextareaFocus = (scrollViewRef: React.RefObject<any>, textareaRef: React.RefObject<any>) => {
  if (scrollViewRef.current && textareaRef.current) {
    scrollToItem(scrollViewRef, textareaRef);
  }
};
