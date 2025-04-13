/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createTamagui } from '@tamagui/core';
import { defaultConfig } from '@tamagui/config/v4';

const tamaguiConfig = createTamagui(defaultConfig);

export type AppConfig = typeof tamaguiConfig;
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
