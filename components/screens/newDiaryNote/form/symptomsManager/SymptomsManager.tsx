import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@/components/ui";
import AddOrUpdateSymptomItemSheet from "./addOrUpdateSymptomItemSheet/AddOrUpdateSymptomItemSheet";
import CommentField from "./fileds/commentField/CommentField";
import useModalController from "@/hooks/useModalController";
import { useTranslation } from "react-i18next";
import SymptomChipsField from "./fileds/symptomChipsField/SymptomChipsField";
import Form from "@/form";

const SymptomsManager: React.FC = () => {
    const { t } = useTranslation();
    const { open, onOpen, onClose } = useModalController();

    return (
        <>
            <AddOrUpdateSymptomItemSheet open={open} onClose={onClose} />
            <UI.Paper
                p='$4'
                flex={1}
            >
                <UI.YStack gap={"$3"} flex={1}>
                    <UI.Typo.Text>{t("meteo.pages.newDiaryNote.symptomsList.header")}</UI.Typo.Text>
                    <SymptomChipsField onPressOpen={onOpen} />

                    <UI.YStack gap={"$3"}>
                        <UI.Button size={"$3"} onPress={onOpen}>
                            {t("meteo.pages.newDiaryNote.symptomsList.buttons.addNew")}
                        </UI.Button>
                    </UI.YStack>
                    <CommentField />
                </UI.YStack>

                <Form.Submit size={"$5"}>
                    {t("meteo.pages.newDiaryNote.submit")}
                </Form.Submit>
            </UI.Paper>
        </>
    );
};

export default observer(SymptomsManager);
