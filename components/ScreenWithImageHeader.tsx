import React, { useState } from 'react';
import { YStack, Image, ScrollView } from 'tamagui';
import HeaderImageSkeletonLoader from './HeaderImageSkeletonLoader';
import { Screen, ScreenProps } from './Screen';

export interface ScreenWithImageHeaderProps extends ScreenProps {
  imageUrl: string;
}

export const ScreenWithImageHeader = ({
  imageUrl,
  children,
  headerProps,
  contentContainerStyle,
  footerProps,
}: ScreenWithImageHeaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Screen headerProps={headerProps} contentContainerStyle={contentContainerStyle} footerProps={footerProps}>
      {/* image container */}
      <YStack
        position='relative'
        width='100%'
        height={'25%'}
        shadowColor='black'
        shadowOffset={{ width: 0, height: 5 }}
        shadowOpacity={0.2}
        shadowRadius={8}
        elevation={5}>
        {!imageLoaded ? <HeaderImageSkeletonLoader /> : null}

        <Image
          source={{
            uri: imageUrl,
          }}
          width='100%'
          height='100%'
          objectFit='cover'
          opacity={imageLoaded ? 1 : 0}
          onLoadEnd={() => setImageLoaded(true)}
        />
      </YStack>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: '$md',
          gap: '$md',
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {children || null}
      </ScrollView>
    </Screen>
  );
};
