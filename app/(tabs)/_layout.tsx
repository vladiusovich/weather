import Router from '@/components/route';
import { Info, Cloud } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router';
import { GetThemeValueForKey } from 'tamagui';

const TabsLayout = () => {
    return (
        <Router.Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Weather',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Cloud color={color as GetThemeValueForKey<'color'>} strokeWidth={1} />
                    ),
                }}
            />
            <Tabs.Screen
                name='about'
                options={{
                    title: 'About',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Info color={color as GetThemeValueForKey<'color'>} strokeWidth={1} />
                    ),
                }}
            />
        </Router.Tabs>
    );
};

export default TabsLayout;
