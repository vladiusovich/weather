import { Tabs as NativeTabs } from "expo-router";
import React from "react";
import { useTheme } from "tamagui";

interface StackProps {
    children?: React.ReactNode;
}

const Tabs: React.FC<StackProps> = ({
    children,
}) => {
    const theme = useTheme();

    return (
        <NativeTabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.accentColor.val,
                headerStyle: {
                    backgroundColor: theme.background.val,
                },
                sceneStyle: {
                    backgroundColor: theme.background.val,
                },
                headerShadowVisible: false,
                headerTintColor: theme.color.val,
                tabBarStyle: {
                    backgroundColor: theme.color2.val,
                    shadowColor: theme.accentColor.val,
                    paddingTop: 4,
                    height: 75,
                    // borderColor: theme.accentColor.val,
                    borderTopWidth: 0, // Removes the top border
                    elevation: 0, // Removes Android shadow
                    shadowOpacity: 0, // Removes iOS shadow
                },
            }}
        >
            {children}
        </NativeTabs>
    );
};


export default Tabs;
