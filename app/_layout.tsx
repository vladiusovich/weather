import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { StrictMode, useEffect, useState } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import config from '@/tamagui.config';
import AppStoreProvider from '@/store/provider/AppStoreProvider';
import i18n from '@/services/translations/i18n';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
    const systemTheme = useColorScheme();
    const [themes] = useState(systemTheme || 'dark');

    useEffect(() => {
        i18n.init();
    }, []);

    return (
        <>
            <StrictMode>
                <TamaguiProvider config={config} defaultTheme={themes}>
                    <AppStoreProvider>
                        <StatusBar style='auto' />
                        <Stack
                            screenOptions={{
                            }}>
                            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                            <Stack.Screen name='+not-found' />
                        </Stack>
                    </AppStoreProvider>
                </TamaguiProvider>
            </StrictMode>
        </>
    );
}
