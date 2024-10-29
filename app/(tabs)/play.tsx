import { Icon } from "@/components/Icon";
import React, { useState } from "react";
import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { XStack, YStack } from "tamagui";
import { Thermometer } from "@/components/Thermometer";
import Button from "@/components/Button";
import { DistressMeter } from "@/components/DistressMeter";

export default function Play() {
  const [stressValue, setStressValue] = useState(5);
  const maxStressValue = 10;
  const step = 2;

  const incrementStressValue = () => {
    if (stressValue < maxStressValue) {
      setStressValue(stressValue + step);
    }
  };

  const decrementStressValue = () => {
    if (stressValue > 0) {
      setStressValue(stressValue - step);
    }
  };

  return (
    <Screen
      headerProps={{
        title: "Screen with header",
        titleProps: { color: "white" },
        statusBarStyle: "light",
        iconLeft: <Icon icon="chevronLeft" color="white" />,
        onLeftPress: () => {
          console.log("left pressed");
        },
        iconRight: <Icon icon="heart" color="white" />,
        onRightPress: () => {
          console.log("right pressed");
        },
      }}
      contentContainerStyle={{
        padding: "$md",
        borderWidth: 3,
        borderColor: "yellow",
      }}
    >
      <DistressMeter
        onIncrement={incrementStressValue}
        onDecrement={decrementStressValue}
        stressValue={stressValue}
        setStressValue={setStressValue}
        thermometerProps={{
          width: 100,
          height: 300,
          step: 2,
          max: maxStressValue,
        }}
      />
    </Screen>
  );
}
