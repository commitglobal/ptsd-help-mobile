import React from "react";
import { Sheet, SheetProps, YStackProps } from "tamagui";

interface BottomSheetProps extends SheetProps {
  frameProps: YStackProps;
  children: React.ReactNode;
}

export const BottomSheet = ({
  frameProps,
  children,
  ...rest
}: BottomSheetProps) => {
  return (
    <Sheet open snapPoints={[80]} {...rest}>
      <Sheet.Overlay />
      {rest.dismissOnSnapToBottom && <Sheet.Handle opacity={1} />}
      <Sheet.Frame padding="$lg" {...frameProps}>
        {children}
      </Sheet.Frame>
    </Sheet>
  );
};
