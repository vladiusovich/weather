import React, { useEffect } from "react";
import * as SystemUI from "expo-system-ui";

// Init global backgound color
const BackgroundUpdateProvider: React.FC = () => {
    useEffect(() => {
        // Use a transparent color because when "navigation.back" is launched (by the system back or an application),
        // the screen will flash some color.
        SystemUI.setBackgroundColorAsync("transparent");
    }, []);

    return null;
};

export default BackgroundUpdateProvider;