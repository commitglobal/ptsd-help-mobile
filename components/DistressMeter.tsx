import React from "react";
import { XStack, YStack } from "tamagui";
import Button from "./Button";
import { Typography } from "./Typography";
import { Icon } from "./Icon";
import { Thermometer } from "./Thermometer";

interface DistressMeterProps {
  onIncrement: () => void;
  onDecrement: () => void;
  stressValue: number;
  setStressValue: React.Dispatch<React.SetStateAction<number>>;
  thermometerProps: {
    width: number;
    height: number;
    step: number;
    max: number;
  };
}

export const DistressMeter = ({
  onIncrement,
  onDecrement,
  stressValue,
  setStressValue,
  thermometerProps,
}: DistressMeterProps) => {
  return (
    <XStack alignSelf="center" alignItems="center" gap="$md">
      <YStack gap="$md" alignItems="center">
        <Button
          icon={<Icon icon="plus" color="white" />}
          onPress={onIncrement}
        />
        <Typography>{stressValue}</Typography>
        <Button
          icon={<Icon icon="minus" color="white" />}
          onPress={onDecrement}
        />
      </YStack>
      <Thermometer
        max={thermometerProps.max}
        step={thermometerProps.step}
        value={stressValue}
        onChange={setStressValue}
        width={thermometerProps.width}
        height={thermometerProps.height}
      />
    </XStack>
  );
};
