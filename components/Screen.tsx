import React, { useMemo } from 'react';
import { Spinner, XStack, YStack, YStackProps } from 'tamagui';
import { Header, HeaderProps } from './Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated, KeyboardAvoidingView, Platform } from 'react-native';
import Button from './Button';
import { Icon } from './Icon';
import useAnimatedBottomPadding from '@/hooks/useAnimatedBottomPadding';

interface FooterProps {
  onMainAction?: () => void;
  mainActionLabel?: string;
  mainActionDisabled?: boolean;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionDisabled?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onCustomAction?: () => void;
  customActionIcon?: string;
  isLoading?: boolean;
}

export interface ScreenProps extends YStackProps {
  children?: React.ReactNode;
  headerProps?: HeaderProps;
  contentContainerStyle?: YStackProps;
  footerProps?: FooterProps;
  footerContainerStyle?: YStackProps;
}

export const Screen = ({
  children,
  headerProps,
  contentContainerStyle,
  footerProps,
  footerContainerStyle,
}: ScreenProps) => {
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

  const paddingBottom = useAnimatedBottomPadding(16);

  const AnimatedYStack = Animated.createAnimatedComponent(YStack);

  return (
    <YStack paddingTop={headerProps ? 0 : insets.top} flex={1} backgroundColor={backgroundColor}>
      {headerProps && <Header {...headerProps} />}

      <YStack {...contentContainerStyle} flex={1} flexGrow={1}>
        {children}

        {hasFooterButtons && (
          <AnimatedYStack
            marginTop='auto'
            paddingBottom={paddingBottom}
            paddingHorizontal='$md'
            gap='$xs'
            backgroundColor={footerBackgroundColor}
            {...footerContainerStyle}>
            {hasSmallButtons && (
              <XStack gap='$xs'>
                {footerProps.onPrev && (
                  <Button
                    preset='secondary'
                    icon={<Icon icon='chevronLeft' width={24} height={24} color='$gray12' />}
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
                        width={24}
                        height={24}
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
                    icon={<Icon icon='chevronRight' width={24} height={24} color='$gray12' />}
                    flex={1}
                    onPress={footerProps.onNext}
                  />
                )}
              </XStack>
            )}

            {footerProps.onMainAction && (
              <Button
                onPress={footerProps.onMainAction}
                disabled={footerProps.mainActionDisabled || footerProps.isLoading}
                icon={footerProps.isLoading ? <Spinner size='small' color='$blue11' /> : null}>
                {footerProps.mainActionLabel || 'Done'}
              </Button>
            )}
            {footerProps.onSecondaryAction && (
              <Button
                preset='secondary'
                onPress={footerProps.onSecondaryAction}
                disabled={footerProps.secondaryActionDisabled || footerProps.isLoading}>
                {footerProps.secondaryActionLabel}
              </Button>
            )}
          </AnimatedYStack>
        )}
      </YStack>
    </YStack>
  );
};
