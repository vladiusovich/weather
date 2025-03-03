import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { StrictMode, useEffect, useState } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import config from '@/tamagui.config';
import AppStoreProvider from '@/store/provider/AppStoreProvider';
import i18n from '@/services/translations/i18n';
import { useColorScheme } from 'react-native';
import Router from '@/components/route';

const RootLayout = () => {
    const systemTheme = useColorScheme();
    const [theme] = useState(systemTheme || 'dark');

    useEffect(() => {
        i18n.init();
    }, []);

    return (
        <StrictMode>
            <TamaguiProvider config={config} defaultTheme={theme}>
                <AppStoreProvider>
                    <StatusBar style={theme} />
                    <Router.Stack>
                        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                        <Stack.Screen name='+not-found' options={{ headerShown: false }} />
                    </Router.Stack>
                </AppStoreProvider>
            </TamaguiProvider>
        </StrictMode>
    );
}

export default RootLayout;
