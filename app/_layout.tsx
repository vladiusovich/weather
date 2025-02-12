import { Stack } from 'expo-router';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { StatusBar } from 'expo-status-bar';
import React, { StrictMode } from 'react';

export default function RootLayout() {
    return (
        <>
            <StrictMode>
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
            </StrictMode>
        </>
    );
}
