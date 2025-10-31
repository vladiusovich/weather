import Language from "@/components/screens/settings/language/Language";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const LanguagesScreen = () => {
    const { t } = useTranslation();

    return (
        <>
            <Stack.Screen options={{
                title: t("pages.languages.header"),
                headerRight: () => null,
            }} />
            <Language />
        </>
    );
};

export default LanguagesScreen;
