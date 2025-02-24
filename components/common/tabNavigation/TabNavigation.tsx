import { ScreenProps, Tabs } from 'expo-router';
import TabIcon from './TabIcon';

interface NavigationOption extends ScreenProps {
    activeIcon: string;
    inactiveIcon: string;
}

interface TabNavigationType {
    tabs: NavigationOption[];
}

// TODO: global styles
const TabNavigation: React.FC<TabNavigationType> = ({ tabs }) => {
    return (
        <Tabs
            screenOptions={{
                // tabBarActiveTintColor: theme.colors.primary[300],
                headerStyle: {
                    // backgroundColor: theme.colors.background[100],
                },
                headerShadowVisible: false,
                // headerTintColor: theme.colors.typography.regular[100],
                tabBarStyle: {
                    // backgroundColor: theme.colors.background[100],
                    borderTopWidth: 0, // Removes the top border
                    elevation: 0, // Removes Android shadow
                    shadowOpacity: 0, // Removes iOS shadow
                },
            }}>
            {tabs.map((tab) => {
                return (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.name}
                        options={{
                            ...tab?.options,
                            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                                <TabIcon focused={focused} activeIcon={tab.activeIcon} inactiveIcon={tab.inactiveIcon} color={color} />
                            ),
                        }}
                    />
                );
            })}
        </Tabs>
    );
};

export default TabNavigation;
