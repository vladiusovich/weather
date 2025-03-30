import Router from '@/components/route';
import { BookHeart, CloudSun } from '@tamagui/lucide-icons'
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
                        <CloudSun color={color as GetThemeValueForKey<'color'>} strokeWidth={1} />
                    ),
                }}
            />
            <Tabs.Screen
                name='diary'
                options={{
                    title: 'Diary',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <BookHeart color={color as GetThemeValueForKey<'color'>} strokeWidth={1} />
                    ),
                }}
            />
        </Router.Tabs>
    );
};

export default TabsLayout;
