import { Stack } from 'expo-router';
import '@/global.css';
import { StatusBar } from 'expo-status-bar';
import React, { StrictMode } from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from '@/theme/theme';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import AppStoreProvider from '@/store/provider/AppStoreProvider';
import i18n from '@/services/translations/i18n';

// TODO: remove GluestackUIProvider and all UI components
export default function RootLayout() {
    i18n.init();

    return (
        <>
            <StrictMode>
                <AppStoreProvider>
                    <ThemeProvider theme={theme}>
                        <GluestackUIProvider mode='system'>
                            <StatusBar style='auto' />
                            <Stack>
                                <Stack.Screen
                                    name='(tabs)'
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen name='+not-found' />
                            </Stack>
                        </GluestackUIProvider>
                    </ThemeProvider>
                </AppStoreProvider>
            </StrictMode>
        </>
    );
}
