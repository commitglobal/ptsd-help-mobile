import { Platform } from 'react-native';

const scrollToPadding = 16;

export const scrollToItem = (scrollViewRef: any, itemRef: any) => {
  if (Platform.OS === 'ios') {
    if (scrollViewRef.current && itemRef.current) {
      (itemRef.current as any).measureLayout(
        scrollViewRef.current,
        (x: number, y: number, _width: number, _height: number) => {
          setTimeout(() => {
            (scrollViewRef.current as any).scrollTo({
              y: y - scrollToPadding,
              animated: true,
            });
          }, 100);
        },
        () => {}
      );
    }
  }
};
