import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import React, { useEffect, useState } from 'react';
import UI from '@/components/ui';
import { DatePickerProviderProps } from '@rehookify/datepicker';
import { getNow, toDate } from '@/utils/datetime.helper';

/** ------ EXAMPLE ------ */
export const DatePickerSelect = () => {
    const now = toDate(getNow());

    const [selectedDates, onDatesChange] = useState<Date[]>([now])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(false)
    }, [selectedDates])

    const config: DatePickerProviderProps['config'] = {
        selectedDates,
        onDatesChange,
        calendar: {
            startDay: 1,
        },
    }

    return (
        <UI.DatePicker.DatePicker keepChildrenMounted open={open} onOpenChange={setOpen} config={config}>
            <UI.DatePicker.DatePicker.Trigger asChild>
                <UI.DatePicker.DatePickerInput
                    placeholder="Select Date"
                    value={selectedDates[0]?.toDateString() || ''}
                    onReset={() => onDatesChange([])}
                    onButtonPress={() => setOpen(true)}
                />
            </UI.DatePicker.DatePicker.Trigger>

            <UI.DatePicker.DatePicker.Content>
                <UI.DatePicker.DatePicker.Content.Arrow />
                <UI.DatePicker.DatePickerBody config={config} />
            </UI.DatePicker.DatePicker.Content>
        </UI.DatePicker.DatePicker>
    )
}

const DatePeriod: React.FC = () => {
    const appStore = useAppStore();
    const now = toDate(getNow());

    return (
        <UI.Card
            padding='$4'
            backgroundColor={'$background02'}
        >
            <UI.Card.Header size={'$0.5'}>
                <UI.YStack gap={'$2'} items='flex-start'>
                    {/* <DatePickerSelect /> */}
                    <UI.NativeDateTimePicker
                        date={now}
                        type='date'
                    />
                </UI.YStack>
            </UI.Card.Header>
            <UI.Separator marginBlock={'$2'} />

            <UI.YStack gap={'$2'}>
            </UI.YStack>
        </UI.Card>
    );
};

export default observer(DatePeriod);

