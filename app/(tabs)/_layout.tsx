import { BookHeart, CloudSun, ChartBar } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import Router from "@shared/route";

const tabBarIcon = (Icon: React.ElementType, strokeWidth = 1) => {
    const TabBarIcon = ({
        color,
        size,
    }: {
        focused: boolean;
        color: string;
        size: number;
    }) => (
        <Icon
            color={color}
            size={size}
            strokeWidth={strokeWidth}
        />
    );

    return TabBarIcon;
};

const TabsLayout = () => {
    const { t } = useTranslation();

    return (
        <Router.Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: t("common.tabsScreen.weather"),
                    tabBarIcon: tabBarIcon(CloudSun)
                }}
            />
            <Tabs.Screen
                name='diary'
                options={{
                    title: t("common.tabsScreen.diary"),
                    tabBarIcon: tabBarIcon(BookHeart)
                }}
            />
            <Tabs.Screen
                name='healthStatistic'
                options={{
                    title: t("common.tabsScreen.healthStatistic"),
                    tabBarIcon: tabBarIcon(ChartBar)
                }}
            />
        </Router.Tabs>
    );
};

export default TabsLayout;
