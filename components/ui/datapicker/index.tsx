import { useEffect, useState } from 'react';
import { DatePicker, DatePickerInput } from './dateParts';
import DatePickerBody from './DatePickerBody';
import { DatePickerProviderProps } from '@rehookify/datepicker';
import { DATE_FORMAT, formatDate, toDate } from '@/utils/datetime.helper';


interface DatePickerProps {
    value?: string;
    onChange: (d: Date[]) => void;
    config?: DatePickerProviderProps['config'];
}


export const DatePickerSelector: React.FC<DatePickerProps> = ({
    value = '',
    onChange,
    config,
}) => {
    const date = toDate(value);
    const [selectedDates, setSelectedDates] = useState<Date[]>([date])
    const [open, setOpen] = useState(false)


    const onDatesChange = (d: Date[]) => {
        setSelectedDates(d);
        onChange(d);
        setOpen(false)
    }

    const onReset = () => {
        setSelectedDates([]);
        onChange([]);
    }

    const initConfig: DatePickerProviderProps['config'] = {
        selectedDates,
        onDatesChange,
        calendar: {
            startDay: 1,
        },
        ...config,
    }

    const formated = formatDate(value, DATE_FORMAT);

    return (
        <DatePicker keepChildrenMounted open={open} onOpenChange={setOpen} config={initConfig}>
            <DatePicker.Trigger asChild>
                <DatePickerInput
                    placeholder="Select Date"
                    value={formated ?? ''}
                    onReset={onReset}
                    onButtonPress={() => setOpen(true)}
                />
            </DatePicker.Trigger>

            <DatePicker.Content>
                <DatePicker.Content.Arrow />
                <DatePickerBody config={initConfig} />
            </DatePicker.Content>
        </DatePicker>
    )
}

export default DatePickerSelector;
