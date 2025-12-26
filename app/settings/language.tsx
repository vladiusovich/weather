import Language from "src/features/settings/language/Language";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const LanguagesScreen = () => {
    const { t } = useTranslation();

    return (
        <>
            <Stack.Screen options={{
                title: t("screens.languages.title"),
                headerRight: () => null,
            }} />
            <Language />
        </>
    );
};

export default LanguagesScreen;
