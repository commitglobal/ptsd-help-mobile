import { Stack } from "expo-router";

export default function ToolFlowLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerShown: true,
      }}
    >
      <Stack.Screen name="distress-meter" options={{ headerShown: false }} />
      <Stack.Screen name="tool" options={{}} />
    </Stack>
  );
}
