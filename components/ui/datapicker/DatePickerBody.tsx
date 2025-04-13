import {
    useDatePickerContext,
    type DatePickerProviderProps,
    type DPDay,
} from '@rehookify/datepicker'

import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useMemo, useState } from 'react'
import { AnimatePresence, Button, H3, View } from 'tamagui'

import {
    HeaderTypeProvider,
    MonthPicker,
    YearPicker,
    YearRangeSlider,
    swapOnClick,
    useHeaderType,
    CalendarHeader,
    type HeaderType,
    WeekView,
} from './dateParts';
import { useDateAnimation } from './useDateAnimation';

const DateHeader = () => {
    const {
        data: { calendars },
        propGetters: { subtractOffset },
    } = useDatePickerContext()
    const { type: header, setHeader } = useHeaderType()
    const { year, month } = calendars[0]

    if (header === 'year') {
        return <YearRangeSlider />
    }

    if (header === 'month') {
        return (
            <H3 size="$7" self="center">
                Select a month
            </H3>
        )
    }

    return (
        <View flexDirection="row" width="100%" items="center" justify="space-between">
            <Button circular size="$4" {...swapOnClick(subtractOffset({ months: 1 }))}>
                <Button.Icon scaleIcon={1.5}>
                    <ChevronLeft />
                </Button.Icon>
            </Button>

            <CalendarHeader year={year} month={month} setHeader={setHeader} />

            <Button circular size="$4" {...swapOnClick(subtractOffset({ months: -1 }))}>
                <Button.Icon scaleIcon={1.5}>
                    <ChevronRight />
                </Button.Icon>
            </Button>
        </View>
    )
}

const DayPicker = () => {
    const {
        data: { calendars, weekDays },
        propGetters: { dayButton },
    } = useDatePickerContext()

    const { days } = calendars[0]

    const { prevNextAnimation, prevNextAnimationKey } = useDateAnimation({
        listenTo: 'month',
    })

    // divide days array into sub arrays that each has 7 days, for better stylings
    const subDays = useMemo(
        () =>
            days.reduce((acc, day, i) => {
                if (i % 7 === 0) {
                    acc.push([])
                }
                acc[acc.length - 1].push(day)
                return acc
            }, [] as DPDay[][]),
        [days]
    )

    return (
        <AnimatePresence key={prevNextAnimationKey}>
            <View width="100%" gap="$4" animation="medium" {...prevNextAnimation()}>
                <WeekView weekDays={weekDays} />

                <View flexDirection="column" gap="$2" items="center" justify="center" width="100%">
                    {subDays.map((sDays) => {
                        return (
                            <View
                                justify="space-between"
                                verticalAlign="center"
                                flexDirection="row"
                                key={sDays[0].$date.toString()}
                                gap="$1"
                                flex={1}
                                width="100%"
                            >
                                {sDays.map((d) => (
                                    <Button
                                        key={d.$date.toString()}
                                        chromeless
                                        circular
                                        p={0}
                                        {...swapOnClick(dayButton(d))}
                                        bg={d.selected ? '$background02' : 'transparent'}
                                        themeInverse={d.selected}
                                        disabled={!d.inCurrentMonth}
                                    >
                                        <Button.Text
                                            fontWeight="500"
                                            fontSize="$4"
                                            color={
                                                d.selected ? '$green9' : d.inCurrentMonth ? '$green9' : '$green6'
                                            }
                                        >
                                            {d.day}
                                        </Button.Text>
                                    </Button>
                                ))}
                            </View>
                        )
                    })}
                </View>
            </View>
        </AnimatePresence>
    )
}

const DatePickerBody = ({ config }: { config: DatePickerProviderProps['config'] }) => {
    const [header, setHeader] = useState<HeaderType>('day')

    return (
        <HeaderTypeProvider config={config} type={header} setHeader={setHeader}>
            <View
                flexDirection="column"
                verticalAlign="center"
                gap="$4"
                width="100%"
                p="$4"
            >
                <DateHeader />
                {header === 'month' && <MonthPicker onChange={() => setHeader('day')} />}
                {header === 'year' && <YearPicker onChange={() => setHeader('day')} />}
                {header === 'day' && <DayPicker />}
            </View>
        </HeaderTypeProvider>
    )
}

export default DatePickerBody;