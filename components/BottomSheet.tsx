import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sheet, SheetProps, YStackProps } from 'tamagui';

interface BottomSheetProps extends SheetProps {
  frameProps?: YStackProps;
  children: React.ReactNode;
}

export const BottomSheet = ({ frameProps, children, ...rest }: BottomSheetProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Sheet open snapPoints={rest.snapPointsMode !== 'fit' ? [80] : undefined} {...rest}>
      <Sheet.Overlay />
      {rest.dismissOnSnapToBottom && <Sheet.Handle opacity={1} />}
      <Sheet.Frame padding='$lg' paddingBottom={insets.bottom + 16} {...frameProps}>
        {children}
      </Sheet.Frame>
    </Sheet>
  );
};
