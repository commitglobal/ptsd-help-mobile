import React from 'react';
import { XStack, YStack } from 'tamagui';
import { Typography } from './Typography';
import TextareaInput from './Inputs/Textarea';
import { Icon } from './Icon';
import { FieldError } from 'react-hook-form';

type FormInputProps = {
  label: string;
  infoMessage?: string;
  onInfoMessagePress?: () => void;
  errorMessage?: string | FieldError;
};

const TextFormInput = React.forwardRef<
  React.ElementRef<typeof TextareaInput>,
  FormInputProps & React.ComponentProps<typeof TextareaInput>
>(({ label, placeholder, infoMessage, onInfoMessagePress, errorMessage, ...props }, ref) => {
  return (
    <YStack gap='$sm'>
      <XStack justifyContent='space-between' gap='$md'>
        <Typography flex={1}>{label}</Typography>
        {infoMessage && (
          <XStack
            padding='$sm'
            margin={-12}
            alignSelf='flex-start'
            onPress={onInfoMessagePress}
            pressStyle={{ opacity: 0.5 }}>
            <Icon icon='info' width={18} height={18} color='$blue11' />
          </XStack>
        )}
      </XStack>
      <TextareaInput ref={ref} placeholder={placeholder} errorMessage={errorMessage} maxLength={1000} {...props} />
    </YStack>
  );
});

export default TextFormInput;
