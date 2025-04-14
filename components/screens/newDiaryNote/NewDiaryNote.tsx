import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import DatePeriod from './datePeriod/DatePeriod';

const NewDiaryNote = observer(() => {
    const appStore = useAppStore();
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
    }, []);

    return (
        <UI.ScreenWrapper>
            <UI.YStack>
                <DatePeriod />
            </UI.YStack>
        </UI.ScreenWrapper>
    )
});

export default NewDiaryNote;