import NewDiaryNote from "@features/newDiaryNote/NewDiaryNote";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const NewDiaryNoteScreen = () => {
    const { t } = useTranslation();
    return (
        <>
            <Stack.Screen
                options={{
                    title: t("screens.newDiaryNote.header"),
                }}
            />
            <NewDiaryNote />
        </>
    );
};

export default NewDiaryNoteScreen;
