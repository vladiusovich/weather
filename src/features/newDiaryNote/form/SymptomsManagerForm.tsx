import { observer } from "mobx-react-lite";
import React from "react";
import UI from "src/shared/components/ui";
import CommentField from "./fileds/commentField/CommentField";
import useModalController from "@hooks/useModalController";
import { useTranslation } from "react-i18next";
import SymptomChipsField from "./fileds/symptomChipsField/SymptomChipsField";
import Form from "@shared/form/index";
import Date from "./fileds/date/Date";
import ExtendedSymptomsListSheet from "../extendedSymptomsListSheet/ExtendedSymptomsListSheet";
import SelectedSymptomCards from "./fileds/selectedSymptoms/SelectedSymptomCards";

const SymptomsManagerForm: React.FC = () => {
    const { t } = useTranslation();
    const { open, onOpen, onClose } = useModalController();

    return (
        <UI.YStack gap={"$3"} flex={1}>
            <ExtendedSymptomsListSheet open={open} onClose={onClose} />
            <UI.Paper flex={1}>
                <UI.YStack flex={1} gap={"$5"}>
                    <UI.YStack gap={"$5"}>
                        <Date />
                        <SymptomChipsField onPressOpen={onOpen} />
                        <CommentField />
                    </UI.YStack>

                    <SelectedSymptomCards />
                </UI.YStack>

                <Form.Submit size={"$5"} mt={"$2"}>
                    {t("screens.newDiaryNote.submit")}
                </Form.Submit>
            </UI.Paper>
        </UI.YStack>
    );
};

export default observer(SymptomsManagerForm);
