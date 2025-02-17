import { ScreenProps, Tabs } from 'expo-router';
import TabIcon from './TabIcon';

interface NavigationOption extends ScreenProps {
    activeIcon: string;
    inactiveIcon: string;
}

interface TabNavigationType {
    tabs: NavigationOption[];
}

const TabNavigation: React.FC<TabNavigationType> = ({ tabs }) => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#dddda1',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
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
                            tabBarIcon: ({
                                color,
                                focused,
                            }: {
                                color: string;
                                focused: boolean;
                            }) => (
                                <TabIcon
                                    focused={focused}
                                    activeIcon={tab.activeIcon}
                                    inactiveIcon={tab.inactiveIcon}
                                    color={color}
                                />
                            ),
                        }}
                    />
                );
            })}
        </Tabs>
    );
};

export default TabNavigation;
