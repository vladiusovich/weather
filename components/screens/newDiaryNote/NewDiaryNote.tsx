import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import { View } from 'tamagui';
import UI from '@/components/ui';
import DatePeriod from './datePeriod/DatePeriod';

const NewDiaryNote = observer(() => {
    const appStore = useAppStore();
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
    }, []);

    return (
        <View>
            <UI.YStack>
                <DatePeriod />
            </UI.YStack>
        </View>
    );
});

export default NewDiaryNote;