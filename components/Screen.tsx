import React, { useMemo } from 'react';
import { XStack, YStack, YStackProps } from 'tamagui';
import { Header, HeaderProps } from './Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Button from './Button';
import { Icon } from './Icon';

interface FooterProps {
  onMainAction?: () => void;
  mainActionLabel?: string;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onCustomAction?: () => void;
  customActionIcon?: string;
}

export interface ScreenProps extends YStackProps {
  children?: React.ReactNode;
  headerProps?: HeaderProps;
  contentContainerStyle?: YStackProps;
  footerProps?: FooterProps;
}

export const Screen = ({ children, headerProps, contentContainerStyle, footerProps }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const isIos = useMemo(() => Platform.OS === 'ios', []);

  // if we don't have a header and we set a background color for the contentContainer, we need to set that backgroundColor to the parent YStack container that adds the insetsTop as well
  const backgroundColor =
    !headerProps && contentContainerStyle?.backgroundColor ? contentContainerStyle.backgroundColor : undefined;

  const footerBackgroundColor =
    footerProps && contentContainerStyle?.backgroundColor ? contentContainerStyle.backgroundColor : 'transparent';

  const hasBigButtons = footerProps?.onMainAction || footerProps?.onSecondaryAction;

  const hasSmallButtons = footerProps?.onPrev || footerProps?.onNext || footerProps?.onCustomAction;

  const hasFooterButtons = hasBigButtons || hasSmallButtons;

  return (
    <YStack paddingTop={headerProps ? 0 : insets.top} flex={1} backgroundColor={backgroundColor}>
      {headerProps && <Header {...headerProps} />}

      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack {...contentContainerStyle} flex={1} flexGrow={1}>
          {children}

          {hasFooterButtons && (
            <YStack
              marginTop='auto'
              paddingBottom={insets.bottom + 16}
              paddingHorizontal='$md'
              gap='$xs'
              backgroundColor={footerBackgroundColor}>
              {hasSmallButtons && (
                <XStack gap='$xs'>
                  {footerProps.onPrev && (
                    <Button
                      preset='secondary'
                      icon={<Icon icon='chevronLeft' width={20} height={20} color='$gray12' />}
                      flex={1}
                      onPress={footerProps.onPrev}
                    />
                  )}
                  {footerProps.onCustomAction && (
                    <Button
                      preset='secondary'
                      icon={
                        <Icon
                          icon={footerProps.customActionIcon ? footerProps.customActionIcon : 'arrowUpOnSquare'}
                          width={20}
                          height={20}
                          color='$gray12'
                        />
                      }
                      flex={1}
                      onPress={footerProps.onCustomAction}
                    />
                  )}
                  {footerProps.onNext && (
                    <Button
                      preset='secondary'
                      icon={<Icon icon='chevronRight' width={20} height={20} color='$gray12' />}
                      flex={1}
                      onPress={footerProps.onNext}
                    />
                  )}
                </XStack>
              )}

              {footerProps.onMainAction && (
                <Button onPress={footerProps.onMainAction}>{footerProps.mainActionLabel || 'Done'}</Button>
              )}
              {footerProps.onSecondaryAction && (
                <Button preset='secondary' onPress={footerProps.onSecondaryAction}>
                  {footerProps.secondaryActionLabel}
                </Button>
              )}
            </YStack>
          )}
        </YStack>
      </KeyboardAvoidingView>
    </YStack>
  );
};
