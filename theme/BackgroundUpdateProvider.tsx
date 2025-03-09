import React, { useEffect } from 'react';
import { useTheme } from 'tamagui';
import * as SystemUI from 'expo-system-ui';

// Init global backgound color
const BackgroundUpdateProvider: React.FC = () => {
    const theme = useTheme();

    useEffect(() => {
        SystemUI.setBackgroundColorAsync(theme.black4.val ?? 'black');
    }, [theme.black4.val]);

    return null;
}

export default BackgroundUpdateProvider;