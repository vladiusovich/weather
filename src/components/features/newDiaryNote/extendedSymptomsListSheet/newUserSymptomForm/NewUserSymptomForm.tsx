import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@shared/components/ui";
import useCreateForm from "@hooks/useCreateForm";
import Form from "@form/index";
import { Plus } from "@tamagui/lucide-icons";
import NewUserSymptomFormStore from "../../store/NewUserSymptomFormStore";
import { useTranslation } from "react-i18next";

const NewUserSymptomForm = (() => {
    const { t } = useTranslation();
    const form = useCreateForm(NewUserSymptomFormStore);

    return (
        <Form.Provider form={form}>
            <UI.Paper>
                <UI.YStack gap={"$2"}>
                    <UI.Typo.Paragraph>
                        {t("screens.newDiaryNote.addSymptom.header")}
                    </UI.Typo.Paragraph>
                    <UI.XStack items={"center"} gap={"$2"}>
                        <UI.View flex={1}>
                            <Form.Field
                                component={UI.Input}
                                name="symptomName"
                                placeholder={t("screens.newDiaryNote.fields.symptomName.placeholder")}
                                maxLength={80}
                            />
                        </UI.View>

                        <Form.Submit square size={"$4"}>
                            <Plus />
                        </Form.Submit>
                    </UI.XStack>
                </UI.YStack>
            </UI.Paper>
        </Form.Provider>
    );
});

export default observer(NewUserSymptomForm);