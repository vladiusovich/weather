import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import config from '@/tamagui.config';
import { PortalProvider } from '@tamagui/portal'
import AppStoreProvider from '@/store/provider/AppStoreProvider';
import i18n from '@/services/translations/i18n';
import { useColorScheme } from 'react-native';
import Router from '@/components/route';
import BackgroundUpdateProvider from '@/theme/BackgroundUpdateProvider';

i18n.init();

const RootLayout = () => {
    const systemTheme = useColorScheme();
    const [theme] = useState(systemTheme || 'dark');

    return (
        <TamaguiProvider config={config} defaultTheme={theme}>
            <PortalProvider shouldAddRootHost>
                <BackgroundUpdateProvider />
                <AppStoreProvider>
                    <StatusBar style={theme} />
                    <Router.Stack>
                        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                        <Stack.Screen name='+not-found' options={{ headerShown: false }} />
                    </Router.Stack>
                </AppStoreProvider>
            </PortalProvider>
        </TamaguiProvider>
    );
}

export default RootLayout;
