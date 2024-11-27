import React from 'react';
import { SwitchProps as TamaguiSwitchProps, Switch as TamaguiSwitch } from 'tamagui';

interface SwitchProps extends TamaguiSwitchProps {
  isChecked?: boolean;
  setIsChecked?: (checked: boolean) => void;
}

export const Switch = ({ isChecked, setIsChecked, ...props }: SwitchProps) => {
  return (
    <TamaguiSwitch
      borderColor={isChecked ? '$blue7' : '$gray6'}
      backgroundColor={isChecked ? '$blue7' : '$gray6'}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      {...props}>
      <TamaguiSwitch.Thumb animation='quicker' backgroundColor={isChecked ? '$blue11' : '$gray9'} />
    </TamaguiSwitch>
  );
};
