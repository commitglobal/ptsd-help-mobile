import React, { useMemo } from "react";
import { Animated } from "react-native";
import { Circle, Slider, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

const colors = [
  "$blue11",
  "$blue9",
  "$blue7",
  "$blue4",
  "$orange6",
  "$orange7",
  "$orange9",
  "$orange10",
  "$tomato10",
  "$tomato11",
];

interface ThermometerProps {
  step: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  width: number;
  height: number;
}

export const Thermometer = ({
  step = 1,
  max = 10,
  value = 5,
  onChange,
  width = 100,
  height = 300,
}: ThermometerProps) => {
  //   animate the received alue
  const animatedValue = React.useRef(new Animated.Value(value)).current;
  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [value]);

  const marks = useMemo(
    () => Array.from({ length: max / step }, (_, i) => i * step),
    [max, step]
  );

  return (
    <YStack alignItems="center" width={width} height={height}>
      <Slider
        orientation="vertical"
        size="$12"
        max={max}
        step={step}
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        flex={0.8}
      >
        <Slider.Track
          backgroundColor={"white"}
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          overflow="hidden"
        >
          <LinearGradient
            colors={colors}
            start={[0, 1]}
            end={[0, 0]}
            fullscreen
          />
          {/* this view acts like a mask to reveal the linear gradient underneath */}
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              backgroundColor: "white",
              height: animatedValue.interpolate({
                inputRange: [0, max],
                outputRange: ["100%", "0%"],
              }),
            }}
          />
          {/* thermometermarkings */}
          {marks.map((mark) => (
            <YStack
              key={mark}
              position="absolute"
              left={"50%"}
              right={-5}
              height={2}
              backgroundColor="$gray5"
              top={`${99.5 - (mark / max) * 100}%`}
            />
          ))}
        </Slider.Track>
      </Slider>
      <Circle
        flex={0.2}
        size={60}
        backgroundColor="$blue11"
        elevation="$4"
        marginTop={-5}
      />
    </YStack>
  );
};
