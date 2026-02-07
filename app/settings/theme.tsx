import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import Theme from "@features/settings/theme/Theme";

const ThemeScreen = () => {
    const { t } = useTranslation();

    return (
        <>
            <Stack.Screen options={{
                title: t("screens.theme.title"),
                headerRight: () => null,
            }} />
            <Theme />
        </>
    );
};

export default ThemeScreen;
