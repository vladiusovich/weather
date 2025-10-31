// app/settings/index.tsx
import Settings from "@/components/screens/settings/Settings";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const SettingsScreen = () => {
    const { t } = useTranslation();

    return (
        <>
            <Stack.Screen options={{
                title: t("pages.settings.header"),
                headerRight: () => null,
            }} />
            <Settings />
        </>
    );
};

export default SettingsScreen;
