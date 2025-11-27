import { Stack, useRouter } from "expo-router";
import React from "react";
import UI from "@components/ui";
import { useTranslation } from "react-i18next";
import { AlertCircle } from "@tamagui/lucide-icons";

const NotFoundScreen = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <UI.YStack
                flex={1}
                justify='center'
                items='center'
                gap={"$3"}
            >
                <AlertCircle size={80} />
                <UI.Typo.H5>
                    {t("screens.notFound.header")}
                </UI.Typo.H5>
                <UI.Button size={"$4"} onPress={() => router.back()}>
                    {t("screens.notFound.submit")}
                </UI.Button>
            </UI.YStack>
        </>
    );
};

export default NotFoundScreen;
