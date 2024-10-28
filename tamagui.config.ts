import { config } from "@tamagui/config/v3";
import { themes } from "./theme/themes";
import { tokens } from "./theme/tokens";

import { createTamagui } from "tamagui"; // or '@tamagui/core'

const appConfig = createTamagui({
  ...config,
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
