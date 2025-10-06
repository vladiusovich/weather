import type { DatePickerProviderProps } from "@rehookify/datepicker"
import { DatePickerProvider, useDatePickerContext } from "@rehookify/datepicker"
import { getFontSized } from "@tamagui/get-font-sized"
import { Calendar, ChevronLeft, ChevronRight, X } from "@tamagui/lucide-icons"
import type { GestureReponderEvent, ViewProps } from "@tamagui/web"
import type { PopoverProps } from "tamagui"
import {
    Adapt,
    AnimatePresence,
    Button,
    Popover,
    Text,
    View,
    createStyledContext,
    isWeb,
    styled,
    withStaticProperties,
} from "tamagui"
import { ReactNode, useEffect, useRef } from "react"

import { Input } from "./inputParts"
import { useDateAnimation } from "./useDateAnimation"

//
// Helper to swap the native `onClick` to `onPress` (avoiding mutation)
//
export function swapOnClick<D extends { onClick?: any }>(d: D): D & { onPress?: any } {
    return { ...d, onPress: d.onClick }
}

//
// Header Context and Provider
//
export type HeaderType = "day" | "month" | "year"

export const { Provider: HeaderStyleTypeProvider, useStyledContext: useHeaderType } =
    createStyledContext({
        type: "day",
        setHeader: (_: HeaderType) => { },
    })

export const HeaderTypeProvider = ({
    config,
    type,
    setHeader,
    children,
    ...rest
}: {
    config: DatePickerProviderProps["config"]
    type: HeaderType
    setHeader: (type: HeaderType) => void
    children: ReactNode
}) => (
    <DatePickerProvider config={config}>
        <HeaderStyleTypeProvider type={type} setHeader={setHeader} {...rest}>
            {children}
        </HeaderStyleTypeProvider>
    </DatePickerProvider>
)

//
// DatePicker Implementation
//
const DatePickerImpl = (props: DatePickerProps) => {
    const { children, config, ...rest } = props
    const popoverRef = useRef<Popover>(null)

    // Close the popover on scroll for web
    useEffect(() => {
        if (isWeb) {
            const controller = new AbortController()
            const handleScroll = () => popoverRef.current?.close()

            document.body.addEventListener("scroll", handleScroll, {
                signal: controller.signal,
            })

            return () => controller.abort()
        }
    }, [])

    return (
        <DatePickerProvider config={config}>
            <Popover ref={popoverRef} keepChildrenMounted size="$4" allowFlip {...rest}>
                <Adapt when="sm">
                    <Popover.Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                        <Popover.Sheet.Frame paddingBlock="$4" width="100%" items="center">
                            <Adapt.Contents />
                        </Popover.Sheet.Frame>
                        <Popover.Sheet.Overlay
                            animation="lazy"
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                    </Popover.Sheet>
                </Adapt>
                {children}
            </Popover>
        </DatePickerProvider>
    )
}

//
// Popover Content styling
//
const DatePickerContent = styled(Popover.Content, {
    animation: "quick",
    variants: {
        unstyled: {
            false: {
                padding: 12,
                borderWidth: 1,
                borderColor: "$borderColor",
                enterStyle: { y: -10, opacity: 0 },
                exitStyle: { y: -10, opacity: 0 },
                elevate: true,
            },
        },
    } as const,
    defaultVariants: {
        unstyled: process.env.TAMAGUI_HEADLESS === "1",
    },
})

export const DatePicker = withStaticProperties(DatePickerImpl, {
    Trigger: Popover.Trigger,
    Content: withStaticProperties(DatePickerContent, {
        Arrow: styled(Popover.Arrow, {
            borderWidth: 1,
            borderColor: "$borderColor",
        }),
    }),
})

//
// DatePicker Input Component
//
type DatePickerInputProps = {
    onReset: () => void
    onButtonPress?: (e: GestureReponderEvent) => void
}

export const DatePickerInput = Input.Area.styleable<DatePickerInputProps>(
    (props, ref) => {
        const { value, onButtonPress, size = "$3", onReset, ...rest } = props
        return (
            <View minW="100%">
                <Input cursor="pointer" onPress={onButtonPress} size={size}>
                    <Input.Box>
                        <Input.Section>
                            <Input.Area editable={false} value={value} ref={ref} {...rest} color="$color11" />
                        </Input.Section>
                        <Input.Section>
                            <Input.Button
                                onPress={(e) => {
                                    if (value) {
                                        e.stopPropagation()
                                        onReset()
                                    } else {
                                        onButtonPress?.(e)
                                    }
                                }}
                            >
                                <Input.Icon>
                                    {value ? <X /> : <Calendar />}
                                </Input.Icon>
                            </Input.Button>
                        </Input.Section>
                    </Input.Box>
                </Input>
            </View>
        )
    }
)

//
// Sizable Text component
//
export const SizableText = styled(Text, {
    name: "SizableText",
    fontFamily: "$body",
    variants: {
        size: {
            "...fontSize": getFontSized,
        },
    } as const,
    defaultVariants: {
        size: "$true",
    },
})

//
// Month Picker Component
//
export const MonthPicker = ({
    onChange = () => { },
}: {
    onChange?: (e: MouseEvent, date: Date) => void
}) => {
    const {
        data: { months },
        propGetters: { monthButton },
    } = useDatePickerContext()

    const { prevNextAnimation, prevNextAnimationKey } = useDateAnimation({
        listenTo: "year",
    })

    return (
        <AnimatePresence key={prevNextAnimationKey}>
            <View
                {...prevNextAnimation()}
                flexDirection="row"
                flexWrap="wrap"
                gap="$2"
                animation="100ms"
                flex={0}
            // $platform-native={{ justifyContent: 'space-between', width: '100%' }}
            >
                {months.map((month) => (
                    <Button
                        key={month.$date.toString()}
                        themeInverse={month.active}
                        flexBasis={90}
                        bg={month.active ? "$background02" : "transparent"}
                        chromeless
                        p={0}
                        {...swapOnClick(monthButton(month, { onClick: onChange as any }))}
                    >
                        <Button.Text color={"$green9"}>
                            {month.month}
                        </Button.Text>
                    </Button>
                ))}
            </View>
        </AnimatePresence>
    )
}

//
// Year Picker Component
//
export const YearPicker = ({
    onChange = () => { },
}: {
    onChange?: (e: MouseEvent, date: Date) => void
}) => {
    const {
        data: { years, calendars },
        propGetters: { yearButton },
    } = useDatePickerContext()
    const selectedYear = calendars[0].year

    const { prevNextAnimation, prevNextAnimationKey } = useDateAnimation({
        listenTo: "years",
    })

    return (
        <AnimatePresence key={prevNextAnimationKey}>
            <View
                {...prevNextAnimation()}
                animation="quick"
                flexDirection="row"
                flexWrap="wrap"
                gap="$2"
                width="100%"
            // $gtMd={{ maxWidth: 280 }}
            >
                {years.map((year) => (
                    <Button
                        key={year.$date.toString()}
                        themeInverse={year.year === Number(selectedYear)}
                        flexBasis="30%"
                        grow={1}
                        bg={year.year === Number(selectedYear) ? "$background02" : "transparent"}
                        chromeless
                        p={0}
                        {...swapOnClick(yearButton(year, { onClick: onChange as any }))}
                    >
                        <Button.Text color={"$green9"}>
                            {year.year}
                        </Button.Text>
                    </Button>
                ))}
            </View>
        </AnimatePresence>
    )
}

//
// Year Range Slider
//
export const YearRangeSlider = () => {
    const {
        data: { years },
        propGetters: { previousYearsButton, nextYearsButton },
    } = useDatePickerContext()

    return (
        <View flexDirection="row" width="100%" items="center" justify="space-between">
            <Button circular size="$4" {...swapOnClick(previousYearsButton())}>
                <Button.Icon scaleIcon={1.5}>
                    <ChevronLeft />
                </Button.Icon>
            </Button>
            <View y={2} flexDirection="column" items="center">
                <SizableText size="$5">
                    {`${years[0].year} - ${years[years.length - 1].year}`}
                </SizableText>
            </View>
            <Button circular size="$4" {...swapOnClick(nextYearsButton())}>
                <Button.Icon scaleIcon={1.5}>
                    <ChevronRight />
                </Button.Icon>
            </Button>
        </View>
    )
}

//
// Year Slider Component
//
export const YearSlider = () => {
    const {
        data: { calendars },
        propGetters: { subtractOffset },
    } = useDatePickerContext()
    const { setHeader } = useHeaderType()
    const { year } = calendars[0]

    return (
        <View flexDirection="row" width="100%" height={50} items="center" justify="space-between">
            <Button circular size="$3" {...swapOnClick(subtractOffset({ months: 12 }))}>
                <Button.Icon scaleIcon={1.5}>
                    <ChevronLeft />
                </Button.Icon>
            </Button>
            <SizableText
                onPress={() => setHeader("year")}
                selectable
                tabIndex={0}
                size="$6"
                cursor="pointer"
                color="$color11"
                hoverStyle={{ color: "$color12" }}
            >
                {year}
            </SizableText>
            <Button circular size="$3" {...swapOnClick(subtractOffset({ months: -12 }))}>
                <Button.Icon scaleIcon={1.5}>
                    <ChevronRight />
                </Button.Icon>
            </Button>
        </View>
    )
}

//
// Calendar Header Component
//
export const CalendarHeader = ({
    year,
    month,
    setHeader,
}: {
    year: string
    month: string
    setHeader: (header: "year" | "month") => void
}) => (
    <View flexDirection="column" height={50} items="center">
        <SizableText
            onPress={() => setHeader("year")}
            tabIndex={0}
            size="$4"
            cursor="pointer"
            color="$color11"
            hoverStyle={{ color: "$color12" }}
        >
            {year}
        </SizableText>
        <SizableText
            onPress={() => setHeader("month")}
            tabIndex={0}
            cursor="pointer"
            size="$6"
            color="$green9"
            fontWeight="bold"
            hoverStyle={{ color: "$green10" }}
        >
            {month}
        </SizableText>
    </View>
)

//
// Week View Component
//
export const WeekView = ({
    weekDays,
    ...props
}: {
    weekDays: string[]
    props?: ViewProps
}) => (
    <View width="100%" flexDirection="row" gap="$1" {...props}>
        {weekDays.map((day) => (
            <SizableText key={day} flex={1} verticalAlign="center" width="100%" size="$4">
                {day}
            </SizableText>
        ))}
    </View>
)

// Type for DatePicker component props
type DatePickerProps = PopoverProps & {
    config: DatePickerProviderProps["config"]
}
