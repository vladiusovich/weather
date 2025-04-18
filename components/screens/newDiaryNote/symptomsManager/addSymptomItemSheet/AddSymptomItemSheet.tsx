import { observer } from 'mobx-react-lite';
import React from 'react';
import UI from '@/components/ui';
import AddSymptomItemForm from './AddSymptomItemForm';

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddSymptomItemSheet: React.FC<Props> = ({
    open,
    onClose,
}) => {
    return (
        <UI.SheetView
            open={open}
            onClose={onClose}
            snapPoints={[40]}
        >
            <AddSymptomItemForm onClose={onClose} />
        </UI.SheetView >
    );
};

export default observer(AddSymptomItemSheet);

