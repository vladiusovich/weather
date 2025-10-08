import React, { useEffect } from "react";
import { useTheme } from "tamagui";
import * as SystemUI from "expo-system-ui";

// Init global backgound color
const BackgroundUpdateProvider: React.FC = () => {
    const theme = useTheme();

    useEffect(() => {
        SystemUI.setBackgroundColorAsync(theme.background04.val ?? "background04");
    }, [theme.background04.val]);

    return null;
};

export default BackgroundUpdateProvider;