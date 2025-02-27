import { ScreenProps, Tabs } from 'expo-router';
import { NamedExoticComponent } from 'react';
import { GetThemeValueForKey, useTheme } from 'tamagui';
import type { IconProps } from "@tamagui/helpers-icon";

interface NavigationOption extends ScreenProps {
    Icon: NamedExoticComponent<IconProps>;
}

interface TabNavigationType {
    tabs: NavigationOption[];
}

const TabNavigation: React.FC<TabNavigationType> = ({ tabs }) => {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.green10.val,
                headerStyle: {
                    backgroundColor: theme.black4.val,
                },
                sceneStyle: {
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
            {tabs.map((tab) => {
                return (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.name}
                        options={{
                            ...tab?.options,
                            tabBarIcon: ({ color }: { color: string }) => (
                                <tab.Icon color={color as GetThemeValueForKey<"color">} strokeWidth={1} />
                            ),
                        }}
                    />
                );
            })}
        </Tabs>
    );
};

export default TabNavigation;
