import React from "react";
import { AlertDialog, AlertDialogProps, XStack } from "tamagui";
import { Icon } from "./Icon";

interface DialogProps extends AlertDialogProps {
  children?: React.ReactNode;
}

export const Modal = ({ children, ...props }: DialogProps) => {
  return (
    <AlertDialog {...props}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.7}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          backgroundColor="white"
          paddingHorizontal="$lg"
          width="85%"
          maxHeight="80%"
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <XStack
            alignSelf="flex-end"
            padding="$sm"
            margin={-12}
            onPress={() => props.onOpenChange?.(false)}
            pressStyle={{ opacity: 0.5 }}
          >
            <Icon icon="x" width={16} height={16} />
          </XStack>
          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};
