import React, { useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { ScrollViewProps } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useTheme, XStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/Icon";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

type DrawerContentProps = ScrollViewProps & {
  children?: React.ReactNode;
  backgroundColor: string;
};

export const DrawerContent = (props: DrawerContentProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 32 }}
      bounces={false}
      stickyHeaderIndices={[0]}
      {...props}
    >
      <XStack padding={16} justifyContent="flex-end">
        <Icon
          icon="x"
          width={24}
          height={24}
          color={theme.blue1?.val}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        />
      </XStack>

      <DrawerItem
        key={0}
        label={`About the app`}
        focused={true}
        activeTintColor={theme.blue1?.val}
        activeBackgroundColor={theme.blue9?.val}
        icon={() => (
          <Icon
            icon="info"
            width={24}
            height={24}
            color={theme.blue1?.val}
            marginRight={-16}
          />
        )}
        inactiveTintColor="white"
        onPress={() => router.push("/about")}
        style={{
          paddingLeft: 8,
          paddingVertical: 4,
          marginVertical: 0,
          marginHorizontal: 0,
          borderRadius: 0,
        }}
        allowFontScaling={false}
      />
      <DrawerItem
        key={1}
        label={`My profile`}
        focused={true}
        activeTintColor={theme.blue1?.val}
        activeBackgroundColor={theme.blue9?.val}
        inactiveTintColor="white"
        icon={() => (
          <Icon
            icon="user"
            width={24}
            height={24}
            color={theme.blue1?.val}
            marginRight={-16}
          />
        )}
        onPress={() => router.push("/profile")}
        style={{
          paddingLeft: 8,
          paddingVertical: 4,
          marginVertical: 0,
          marginHorizontal: 0,
          borderRadius: 0,
        }}
        allowFontScaling={false}
      />
      <DrawerItem
        key={2}
        label={`Settings`}
        icon={() => (
          <Icon
            icon="settings"
            width={24}
            height={24}
            color={theme.blue1?.val}
            marginRight={-16}
          />
        )}
        focused={true}
        activeTintColor={theme.blue1?.val}
        activeBackgroundColor={theme.blue9?.val}
        inactiveTintColor="white"
        onPress={() => router.push("/settings")}
        style={{
          paddingLeft: 8,
          paddingVertical: 4,
          marginVertical: 0,
          marginHorizontal: 0,
          borderRadius: 0,
        }}
        allowFontScaling={false}
      />
    </DrawerContentScrollView>
  );
};

export default function MainLayout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => (
          <DrawerContent backgroundColor={theme.blue9?.val} />
        )}
        screenOptions={{
          drawerType: "front",
          headerShown: false,
        }}
      >
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
