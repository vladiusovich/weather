import Settings from "@features/settings/Settings";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const SettingsScreen = () => {
    const { t } = useTranslation();

    return (
        <>
            <Stack.Screen options={{
                title: t("screens.settings.title"),
                headerRight: () => null,
            }} />
            <Settings />
        </>
    );
};

export default SettingsScreen;
