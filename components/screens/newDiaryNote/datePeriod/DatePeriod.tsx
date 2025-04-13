import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React, { useState } from 'react';
import UI from '@/components/ui';
import { getNow } from '@/utils/datetime.helper';

const DatePeriod: React.FC = () => {
    const appStore = useAppStore();
    const [value, setValue] = useState(getNow())

    const onDatesChange = (d: Date[]) => {
        const date = d[0]?.toDateString() ?? '';
        setValue(date);
    }

    return (
        <UI.Card
            padding='$4'
            bg={'$background02'}
        >
            <UI.Card.Header size={'$0.5'}>
                <UI.YStack gap={'$2'} items='flex-start'>
                    <UI.DatePicker value={value} onChange={onDatesChange} />
                    {/* <UI.NativeDateTimePicker
                        date={now}
                        type='date'
                    />
                    <UI.NativeDateTimePicker
                        date={now}
                        type='time'
                    /> */}
                </UI.YStack>
            </UI.Card.Header>

            <UI.YStack gap={'$2'}>
            </UI.YStack>
        </UI.Card>
    );
};

export default observer(DatePeriod);

