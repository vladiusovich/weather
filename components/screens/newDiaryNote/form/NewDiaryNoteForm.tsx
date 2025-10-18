import React from "react";
import { observer } from "mobx-react-lite";
import SymptomsManagerForm from "./symptomsManager/SymptomsManagerForm";
import Form from "@/form";
import NewNoteFormStore from "../store/NewNoteFormStore";

interface PropsType {
    form: NewNoteFormStore;
}

const NewDiaryNoteForm: React.FC<PropsType> = (({
    form
}) => {
    return (
        <Form.Provider form={form}>
            <SymptomsManagerForm />
        </Form.Provider>
    );
});

export default observer(NewDiaryNoteForm);