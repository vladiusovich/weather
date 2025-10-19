import { createTamagui } from "tamagui";
import { themes } from "./themes";
import { defaultConfig } from "@tamagui/config/v4";

// const actual = {
//     ...defaultConfig,
//     settings: {
//         ...settings,
//         onlyAllowShorthands: false,
//     }
// };

// const config = createTamagui(defaultConfig);

const config = createTamagui({
    ...defaultConfig,
    themes,
});

export type AppConfig = typeof config;
declare module "tamagui" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface TamaguiCustomConfig extends AppConfig { }
}

export default config;
