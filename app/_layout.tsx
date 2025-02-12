import { Stack } from 'expo-router';
import '@/global.css';
import { StatusBar } from 'expo-status-bar';
import React, { StrictMode } from 'react';
import { ThemeProvider } from 'styled-components/native';
import THEMES from '@/theme/THEMES';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

export default function RootLayout() {
    return (
        <>
            <StrictMode>
                <ThemeProvider theme={THEMES}>
                    <GluestackUIProvider mode='system'>
                        <Stack>
                            <Stack.Screen
                                name='(tabs)'
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name='+not-found' />
                        </Stack>
                        <StatusBar style='auto' />
                    </GluestackUIProvider>
                </ThemeProvider>
            </StrictMode>
        </>
    );
}
