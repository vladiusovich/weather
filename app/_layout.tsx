import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import { PortalProvider } from "@tamagui/portal";
import AppStoreProvider from "@store/provider/AppStoreProvider";
import { useColorScheme } from "react-native";
import BackgroundUpdateProvider from "@theme/BackgroundUpdateProvider";
import Router from "@shared/route";

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
    const colorScheme = useColorScheme();
    const [theme] = useState(colorScheme ?? "dark");

    return (
        <AppStoreProvider>
            <TamaguiProvider config={config} defaultTheme={theme}>
                <PortalProvider shouldAddRootHost>
                    <BackgroundUpdateProvider />
                    <StatusBar style={theme === "dark" ? "light" : "dark"} />
                    <Router.Stack>
                        <Stack.Screen name='(tabs)' />
                        <Stack.Screen name='+not-found' options={{ headerShown: false }} />
                    </Router.Stack>
                </PortalProvider>
            </TamaguiProvider>
        </AppStoreProvider>
    );
};

export default RootLayout;
