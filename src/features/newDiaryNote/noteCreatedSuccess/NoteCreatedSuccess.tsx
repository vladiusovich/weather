import React from "react";
import { observer } from "mobx-react-lite";
import UI from "src/shared/components/ui";
import { useTranslation } from "react-i18next";
import { Smile } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";

const NoteCreatedSuccess = (() => {
    const { t } = useTranslation();
    const router = useRouter();

    const onPress = () => {
        router.dismissAll();
        router.replace("/(tabs)/diary");
    };

    return (
        <UI.ScreenWrapper>
            <UI.Paper
                p='$4'
                bg={"transparent"}
                flex={1}
            >
                <UI.YStack flex={1}>
                    <UI.YStack
                        justify='center'
                        items='center'
                        gap='$4'
                        flex={1}
                    >
                        <Smile size={80} />
                        <UI.Typo.H5>
                            {t("screens.newDiaryNote.createdSuccess.header")}
                        </UI.Typo.H5>
                    </UI.YStack>
                    <UI.Button size={"$5"} onPress={onPress}>
                        {t("screens.newDiaryNote.createdSuccess.submit")}
                    </UI.Button>
                </UI.YStack>
            </UI.Paper>
        </UI.ScreenWrapper>
    );
});

export default observer(NoteCreatedSuccess);