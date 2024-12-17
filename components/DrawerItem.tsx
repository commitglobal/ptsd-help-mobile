import React from 'react';
import { DrawerItem as DrawerItemRN } from '@react-navigation/drawer';
import { useTheme } from 'tamagui';
import { Icon } from './Icon';

export const DrawerItem = ({ label, onPress, icon }: { label: string; onPress: () => void; icon: string }) => {
  const theme = useTheme();
  return (
    <DrawerItemRN
      label={label}
      focused={true}
      activeTintColor={theme.blue1?.val}
      activeBackgroundColor={theme.blue9?.val}
      icon={() => <Icon icon={icon} width={24} height={24} color={theme.blue1?.val} marginRight={-16} />}
      inactiveTintColor='white'
      onPress={onPress}
      style={{
        paddingLeft: 8,
        paddingVertical: 4,
        marginVertical: 0,
        marginHorizontal: 0,
        borderRadius: 0,
      }}
      allowFontScaling={false}
    />
  );
};
