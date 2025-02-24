import { Stack } from 'expo-router';
import '@/global.css';
import { StatusBar } from 'expo-status-bar';
import React, { StrictMode, useEffect, useState } from 'react';
import { TamaguiProvider } from '@tamagui/core';
import config from '@/tamagui.config';
import AppStoreProvider from '@/store/provider/AppStoreProvider';
import i18n from '@/services/translations/i18n';
import { useColorScheme } from 'react-native';

// TODO: remove GluestackUIProvider and all UI components
export default function RootLayout() {
    const systemTheme = useColorScheme(); // системная тема устройства
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
                        <Stack>
                            <Stack.Screen
                                name='(tabs)'
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name='+not-found' />
                        </Stack>
                    </AppStoreProvider>
                </TamaguiProvider>
            </StrictMode>
        </>
    );
}
