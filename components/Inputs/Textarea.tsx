import React from "react";
import { YStack, TextArea as TamaguiTextArea } from "tamagui";
import { Typography } from "../Typography";

type TextareaProps = {
  errorMessage?: string;
} & React.ComponentProps<typeof TamaguiTextArea>;

const TextareaInput = React.forwardRef<React.ElementRef<typeof TamaguiTextArea>, TextareaProps>(
  ({ errorMessage, value, onChange, ...props }, ref) => {
    const errorStyle = errorMessage ? { borderColor: "$tomato9" } : {};

    return (
      <YStack gap="$sm">
        <TamaguiTextArea
          ref={ref}
          value={value}
          onChangeText={(text: string) => onChange?.({ target: { value: text } } as any)}
          size="$4"
          backgroundColor="$gray1"
          focusStyle={{ borderColor: "$blue9" }}
          verticalAlign="top"
          {...errorStyle}
          {...props}
        />
        {errorMessage && (
          <Typography color="$tomato11" preset="helper">
            {errorMessage}
          </Typography>
        )}
      </YStack>
    );
  },
);

export default TextareaInput;
