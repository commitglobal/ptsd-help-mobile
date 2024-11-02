import { config } from "@tamagui/config/v3";
import { themes } from "./theme/themes";
import { tokens } from "./theme/tokens";
import { fonts } from "./theme/fonts";
import { createTamagui } from "tamagui";

const appConfig = createTamagui({
  ...config,
  fonts,
  tokens,
  themes,
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
