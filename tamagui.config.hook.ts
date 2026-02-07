import { useEffect, useState } from "react";
// eslint-disable-next-line import/namespace
import { TamaguiCustomConfig, createConfig } from "tamagui.config";

const useTamaguiTheme = () => {
    const [currentThemeConfig, set] = useState<TamaguiCustomConfig | null>(null);

    useEffect(() => {
        console.log("useTamaguiTheme.useEffect");
        set(createConfig());
    }, []);

    console.log("useTamaguiTheme", currentThemeConfig?.themes.dark.background);

    return currentThemeConfig;
};

export default useTamaguiTheme;
