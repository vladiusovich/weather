import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';
import AddSymptomItemForm from './AddSymptomItemForm';
import NewNoteFormStore from '../../store/NewNoteFormStore';
import { useFormContext } from '@/store/formStore/FormContext';

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddSymptomItemSheet: React.FC<Props> = ({
    open,
    onClose,
}) => {
    const form = useFormContext<NewNoteFormStore>();

    return (
        <UI.SheetView
            open={open}
            onClose={onClose}
            snapPoints={[40]}
            formStore={form.symptomForm}
        >
            <AddSymptomItemForm onClose={onClose} />
        </UI.SheetView >
    );
};

export default observer(AddSymptomItemSheet);

