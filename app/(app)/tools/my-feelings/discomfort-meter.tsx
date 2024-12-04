import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { useFeelingsContext } from '@/contexts/FeelingsContextProvider';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Circle, ScrollView, Slider, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated';
import useTranslationKeys from '@/hooks/useTranslationKeys';

const GRADIENT_COLORS = {
  0: ['#4ECDC440', '#7BDBD440'],
  10: ['#4ECDC440', '#7BDBD440'],
  20: ['#7BDBD440', '#98E7A740'],
  30: ['#98E7A740', '#C5E17C40'],
  40: ['#C5E17C40', '#F7D79440'],
  50: ['#F7D79440', '#F3A68340'],
  60: ['#F3A68340', '#F1906640'],
  70: ['#F1906640', '#F78FB340'],
  80: ['#F78FB340', '#FF6B6B40'],
  90: ['#FF6B6B40', '#EE525340'],
  100: ['#EE525340', '#FF1E1E40'],
} as const;

const getGradientColors = (value: number) => {
  const threshold = Math.ceil(value / 10) * 10;
  return GRADIENT_COLORS[threshold as keyof typeof GRADIENT_COLORS] ?? GRADIENT_COLORS[100];
};

export default function DiscomfortMeter() {
  const router = useRouter();
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  const { discomfort, setDiscomfort, currentDiscomfortLevel } = useFeelingsContext();
  const [sliderValue, setSliderValue] = useState<number>(discomfort);

  const currentGradientColors = React.useMemo(() => getGradientColors(sliderValue), [sliderValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 100,
    backgroundColor: withTiming(currentGradientColors[0], { duration: 300 }),
  }));

  const onSubmit = () => {
    setDiscomfort(sliderValue);
    router.push('/tools/my-feelings/feelings-summary');
  };

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.MY_FEELINGS.discomfortMeter),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
      }}
      contentContainerStyle={{ backgroundColor: 'white' }}
      footerProps={{
        onMainAction: onSubmit,
        mainActionLabel: t(toolsTranslationKeys.MY_FEELINGS.next),
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          paddingHorizontal: 50,
          gap: 24,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Typography textAlign='center'>{t(toolsTranslationKeys.MY_FEELINGS.discomfortIntensity)}</Typography>
        <XStack>
          <Circle
            size='$14'
            justifyContent='center'
            alignItems='center'
            overflow='visible'
            marginBottom={50}
            shadowColor={currentGradientColors[0]}
            shadowOpacity={1}
            shadowRadius={20}>
            <Animated.View style={animatedStyle} />
            <Typography preset='heading'>{`${sliderValue}%`}</Typography>
          </Circle>
        </XStack>
        <Typography textAlign='center' marginBottom='$lg'>
          {currentDiscomfortLevel}
        </Typography>
        <Slider
          size='$4'
          width={'100%'}
          defaultValue={[discomfort]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setSliderValue(value[0])}>
          <Slider.Track>
            <Slider.TrackActive backgroundColor='$blue7' />
          </Slider.Track>
          <Slider.Thumb circular index={0} backgroundColor='$blue9' borderWidth={0} />
        </Slider>
      </ScrollView>
    </Screen>
  );
}
