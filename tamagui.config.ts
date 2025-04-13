/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createTamagui } from '@tamagui/core';
import { defaultConfig } from '@tamagui/config/v4';

// const settings = defaultConfig.settings;

// const actual = {
//     ...defaultConfig,
//     settings: {
//         ...settings,
//         onlyAllowShorthands: false,
//     }
// };

const tamaguiConfig = createTamagui(defaultConfig);

export type AppConfig = typeof tamaguiConfig;
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
}

export default tamaguiConfig;
