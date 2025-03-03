import { ScreenProps, Tabs } from 'expo-router';
import { NamedExoticComponent } from 'react';
import { GetThemeValueForKey } from 'tamagui';
import type { IconProps } from '@tamagui/helpers-icon';
import Router from '@/components/route';

interface NavigationOption extends ScreenProps {
    Icon: NamedExoticComponent<IconProps>;
}

interface TabNavigationType {
    tabs: NavigationOption[];
}

// TODO: remove?
const TabNavigation: React.FC<TabNavigationType> = ({ tabs }) => {
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

export default TabNavigation;
