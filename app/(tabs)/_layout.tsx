import Router from "@/components/route";
import { BookHeart, CloudSun, ChartBar } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { GetThemeValueForKey } from "tamagui";

const TabsLayout = () => {
    const { t } = useTranslation();

    return (
        <Router.Tabs>
            <Tabs.Screen
                name='index'
                options={{
                    title: t("common.tabsScreen.weather"),
                    tabBarIcon: ({ color }: { color: string }) => (
                        <CloudSun color={color as GetThemeValueForKey<"color">} strokeWidth={1} />
                    ),
                }}
            />
            <Tabs.Screen
                name='diary'
                options={{
                    title: t("common.tabsScreen.diary"),
                    tabBarIcon: ({ color }: { color: string }) => (
                        <BookHeart color={color as GetThemeValueForKey<"color">} strokeWidth={1} />
                    ),
                }}
            />
            <Tabs.Screen
                name='healthStatistic'
                options={{
                    title: t("common.tabsScreen.healthStatistic"),
                    tabBarIcon: ({ color }: { color: string }) => (
                        <ChartBar color={color as GetThemeValueForKey<"color">} strokeWidth={1} />
                    ),
                }}
            />
        </Router.Tabs>
    );
};

export default TabsLayout;
