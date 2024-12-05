import React from 'react';
import { Screen } from '@/components/Screen';
import { Animated, useWindowDimensions, FlatList } from 'react-native';
import { XStack, YStack } from 'tamagui';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'tamagui/linear-gradient';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { OnboardingLastScreen } from '@/components/OnboardingLastScreen';

export interface ItemProps {
  key: string;
  icon?: string;
  title?: string;
  description?: string;
}

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();

  const INTRO_DATA = [
    {
      key: '1',
      icon: 'openBook',
      title: t('onboarding.learn.title'),
      description: t('onboarding.learn.description'),
    },
    {
      key: '2',
      icon: 'chart',
      title: t('onboarding.monitor-progress.title'),
      description: t('onboarding.monitor-progress.description'),
    },
    {
      key: '3',
      icon: 'puzzle',
      title: t('onboarding.manage-symptoms.title'),
      description: t('onboarding.manage-symptoms.description'),
    },
    {
      key: '4',
      icon: 'solidHeart',
      title: t('onboarding.get-support.title'),
      description: t('onboarding.get-support.description'),
    },
    {
      key: '5',
    },
  ];

  const scrollX = React.useRef(new Animated.Value(0)).current;
  // Current item index of flatlist
  const [activeIndex, setActiveIndex] = React.useState(0);
  const flatListRef = React.useRef(null);
  // Flatlist props that calculates current item index
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const gotoNextPage = () => {
    if (activeIndex + 1 < INTRO_DATA.length) {
      //   @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };
  const gotoPrevPage = () => {
    if (activeIndex !== 0) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };

  const renderItem = React.useCallback(
    ({ item, index }: { item: ItemProps; index: number }) => {
      // last page
      if (index === INTRO_DATA.length - 1) {
        return <OnboardingLastScreen />;
      }

      return <OnboardingScreen item={item} />;
    },
    [width]
  );

  const keyExtractor = React.useCallback((item: ItemProps) => item.key, []);
  return (
    <Screen>
      <LinearGradient
        fullscreen
        top={-insets.top}
        colors={['$blue1', '$blue3', '$blue5', '$blue11']}
        start={[0, 0]}
        end={[1, 1]}
      />
      <FlatList
        data={INTRO_DATA}
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
      <XStack paddingBottom={insets.bottom} justifyContent='space-around' alignItems='center'>
        <XStack
          flex={1}
          padding='$md'
          onPress={gotoPrevPage}
          pressStyle={{
            opacity: 0.5,
          }}
          justifyContent='flex-end'>
          {activeIndex > 0 && <Icon icon='chevronLeft' color='white' width={24} height={24} />}
        </XStack>

        <YStack flex={5}>
          <ScalingDot
            data={INTRO_DATA}
            scrollX={scrollX}
            inActiveDotColor='white'
            activeDotColor='white'
            containerStyle={{
              position: 'relative',
              bottom: 0,
              flexDirection: 'row',
            }}
          />
        </YStack>

        <XStack
          flex={1}
          padding='$md'
          onPress={gotoNextPage}
          pressStyle={{
            opacity: 0.5,
          }}>
          {activeIndex < INTRO_DATA.length - 1 && <Icon icon='chevronRight' color='white' width={24} height={24} />}
        </XStack>
      </XStack>
    </Screen>
  );
}
