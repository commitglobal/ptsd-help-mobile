import { Icon } from "@/components/Icon";
import React, { useState } from "react";
import { Screen } from "@/components/Screen";
import { DistressMeter } from "@/components/DistressMeter";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export default function Play() {
  const navigation = useNavigation();

  const [stressValue, setStressValue] = useState(5);
  const maxStressValue = 10;
  const step = 1;

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
        iconLeft: <Icon icon="menuAlt2" color="white" />,
        onLeftPress: () => navigation.dispatch(DrawerActions.openDrawer),
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
          step: step,
          max: maxStressValue,
        }}
      />
    </Screen>
  );
}
