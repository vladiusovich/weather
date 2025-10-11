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
                sceneStyle: {
                    backgroundColor: theme.background.val,
                },
                tabBarActiveTintColor: theme.accentColor.val,
                tabBarStyle: {
                    backgroundColor: theme.color2.val,
                    shadowColor: theme.accentColor.val,
                    height: 75,
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
