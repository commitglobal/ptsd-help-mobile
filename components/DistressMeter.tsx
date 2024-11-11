import React from "react";
import { XStack, XStackProps, YStack } from "tamagui";
import Button from "./Button";
import { Typography } from "./Typography";
import { Icon } from "./Icon";
import { Thermometer, ThermometerProps } from "./Thermometer";

interface DistressMeterProps {
  stressValue: number;
  setStressValue: React.Dispatch<React.SetStateAction<number>>;
  thermometerProps?: ThermometerProps;
  wrapperProps?: XStackProps;
}

export const DistressMeter = ({
  stressValue = 5,
  setStressValue,
  thermometerProps,
  wrapperProps,
}: DistressMeterProps) => {
  const maxValue = thermometerProps?.max ?? 10;

  const onIncrement = () => {
    if (stressValue !== maxValue) {
      setStressValue((prev) => prev + (thermometerProps?.step ?? 1));
    }
  };

  const onDecrement = () => {
    if (stressValue >= 0) {
      setStressValue((prev) => prev - (thermometerProps?.step ?? 1));
    }
  };

  return (
    <XStack alignSelf="center" alignItems="center" gap="$xxxl" {...wrapperProps}>
      <YStack gap="$md" alignItems="center">
        <Button
          icon={<Icon icon="plus" color="white" width={24} height={24} />}
          onPress={onIncrement}
          disabled={stressValue === maxValue}
        />
        <Typography>{stressValue}</Typography>
        <Button
          icon={<Icon icon="minus" color="white" width={24} height={24} />}
          onPress={onDecrement}
          disabled={stressValue === 0}
        />
      </YStack>
      <Thermometer
        max={maxValue}
        step={thermometerProps?.step}
        value={stressValue}
        onChange={setStressValue}
        width={thermometerProps?.width}
        height={thermometerProps?.height}
      />
    </XStack>
  );
};
