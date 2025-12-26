import React, { useState } from "react";
import UI from "src/shared/components/ui";
import { useFormContext } from "@form/formStore/FormContext";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import Form from "src/core/form/index";
import ExtendedSymptomsList from "./fields/extendedSymptomsList/ExtendedSymptomsList";
import NewUserSymptomForm from "./newUserSymptomForm/NewUserSymptomForm";
import NewNoteFormStore from "../store/NewNoteFormStore";

interface Props {
    open: boolean;
    onClose: () => void;
}

const ExtendedSymptomsListSheet: React.FC<Props> = ({
    open,
    onClose,
}) => {
    const { t } = useTranslation();
    const form = useFormContext<NewNoteFormStore>();
    const [searchingValue, setSearchingValueValue] = useState("");
    const onChangeSearchBar = (text: string) => setSearchingValueValue(text);

    return (
        <UI.SheetView
            open={open}
            onClose={onClose}
            snapPoints={[70, 85]}
        >
            <Form.Provider form={form}>
                <UI.YStack gap={"$3"} flex={1}>
                    <UI.Typo.H6>
                        {t("screens.newDiaryNote.extendedSymptomsList.header")}
                    </UI.Typo.H6>
                    <UI.YStack items='stretch' gap='$4'>
                        <UI.Searchbar
                            placeholder={t("screens.newDiaryNote.fields.searchSymptom.placeholder")}
                            onValueChange={onChangeSearchBar}
                            value={searchingValue}
                            bg={"$background06"}
                        />
                        <NewUserSymptomForm />
                        <ExtendedSymptomsList searchingValue={searchingValue} />
                    </UI.YStack>
                </UI.YStack>
            </Form.Provider>
        </UI.SheetView>
    );
};

export default observer(ExtendedSymptomsListSheet);
