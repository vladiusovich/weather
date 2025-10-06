import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import SymptomsManager from "./symptomsManager/SymptomsManager";
import Form from "@/form";
import NewNoteFormStore from "../store/NewNoteFormStore";
import DatePeriod from "./datePeriod/DatePeriod";

interface PropsType {
    form: NewNoteFormStore;
}

const NewDiaryNoteForm: React.FC<PropsType> = (({
    form
}) => {
    return (
        <Form.Provider form={form}>
            <UI.YStack gap={"$2"} flex={1}>
                <DatePeriod />
                <SymptomsManager />
            </UI.YStack>
        </Form.Provider>
    )
});

export default observer(NewDiaryNoteForm);