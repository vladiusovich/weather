import { Tabs as NativeTabs } from 'expo-router';
import React from 'react';
import { useTheme } from 'tamagui';

// type NativeStackProps = typeof NativeStack;

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
                tabBarActiveTintColor: theme.green10.val,
                headerStyle: {
                    backgroundColor: theme.black4.val,
                },
                sceneStyle: {
                    // paddingHorizontal: 15,
                    paddingHorizontal: 15,
                    backgroundColor: theme.black4.val,
                },
                headerShadowVisible: false,
                headerTintColor: theme.color.val,
                tabBarStyle: {
                    backgroundColor: theme.black3.val,
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
