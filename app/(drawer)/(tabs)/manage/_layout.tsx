import { Stack } from "expo-router";

export default function ManageLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(flow)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
