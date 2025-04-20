import React from 'react';
import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import DatePeriod from './datePeriod/DatePeriod';
import SymptomsManager from './symptomsManager/SymptomsManager';
import useCreateForm from '@/hooks/useCreateForm';
import NewNoteFormStore from './store/NewNoteFormStore';
import Form from '@/form';

const NewDiaryNote = (() => {
    const newNoteFormStore = useCreateForm(NewNoteFormStore);

    return (
        <UI.ScreenWrapper>
            <Form.Provider form={newNoteFormStore}>
                <UI.YStack gap={'$2'} flex={1}>
                    <DatePeriod />
                    <SymptomsManager />
                </UI.YStack>
            </Form.Provider>
        </UI.ScreenWrapper>
    )
});

export default observer(NewDiaryNote);