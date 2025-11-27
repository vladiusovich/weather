import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@/components/ui";
import AddOrUpdateSymptomItemForm from "./AddOrUpdateSymptomItemForm";
import { useFormContext } from "@/store/formStore/FormContext";
import NewNoteFormStore from "../../store/NewNoteFormStore";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddOrUpdateSymptomItemSheet: React.FC<Props> = ({
    open,
    onClose,
}) => {
    const form = useFormContext<NewNoteFormStore>();

    return (
        <UI.SheetView
            open={open}
            onClose={onClose}
            formStore={form.symptomForm}
        >
            <AddOrUpdateSymptomItemForm onClose={onClose} />
        </UI.SheetView>
    );
};

export default observer(AddOrUpdateSymptomItemSheet);
