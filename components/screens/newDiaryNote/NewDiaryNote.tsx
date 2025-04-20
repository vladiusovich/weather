import React from 'react';
import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import DatePeriod from './datePeriod/DatePeriod';
import SymptomsManager from './symptomsManager/SymptomsManager';

const NewDiaryNote = (() => {
    return (
        <UI.ScreenWrapper>
            <UI.YStack gap={'$2'} flex={1}>
                <DatePeriod />
                <SymptomsManager />
            </UI.YStack>
        </UI.ScreenWrapper>
    )
});

export default observer(NewDiaryNote);