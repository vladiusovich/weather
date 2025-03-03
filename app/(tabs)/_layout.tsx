import Router from '@/components/route';
import { Home, Cloud } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router';
import { GetThemeValueForKey } from 'tamagui';

const tabs = [
    {
        name: 'index',
        options: {
            title: 'About',
        },
        Icon: Home,
    },
    {
        name: 'weather',
        options: {
            title: 'Weather',
        },
        Icon: Cloud,
    },
];

const TabsLayout = () => {
    return (
        <Router.Tabs>
            {tabs.map((tab) => {
                return (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.name}
                        options={{
                            ...tab?.options,
                            tabBarIcon: ({ color }: { color: string }) => (
                                <tab.Icon color={color as GetThemeValueForKey<'color'>} strokeWidth={1} />
                            ),
                        }}
                    />
                );
            })}
        </Router.Tabs>
    );
};

export default TabsLayout;
