import { Tabs } from "expo-router";
import React from "react";
import AppTabs from "./appTabs/AppTabs";
import { useTheme } from "tamagui";

export type AppTabsRouterProps = {
    children: React.ReactNode;
}

const AppTabsRouter: React.FC<AppTabsRouterProps> = ({
    children,
}) => {
    const theme = useTheme();

    return (
        <Tabs
            tabBar={(props) => <AppTabs {...props} />}
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: theme.background.val,
                }
            }}
        >
            {children}
        </Tabs >
    );
};

export default AppTabsRouter;
