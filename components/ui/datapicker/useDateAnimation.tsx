import { useDatePickerContext } from "@rehookify/datepicker";
import { useEffect, useState } from "react";

export function useDateAnimation({ listenTo }: { listenTo: "year" | "month" | "years" }) {
    const {
        data: { years, calendars },
    } = useDatePickerContext();

    const [prevState, setPrevState] = useState<string | number | null>(null);

    const getCurrentKey = () => {
        if (listenTo === "years") return years.reduce((acc, y) => acc + y.year, 0);
        return calendars[0][listenTo];
    };

    const currentKey = getCurrentKey();

    useEffect(() => {
        if (prevState !== currentKey) {
            setPrevState(currentKey);
        }
    }, [currentKey, prevState]);

    const animation = () => {
        if (prevState === null) return { enterStyle: { opacity: 0 } };

        const oldKey = prevState;
        const newKey = currentKey;

        const direction = (() => {
            if (listenTo === "years") return newKey < oldKey ? -15 : 15;
            if (listenTo === "month" || listenTo === "year") {
                // eslint-disable-next-line max-len
                const oldDate = new Date(`${listenTo === "month" ? oldKey : calendars[0].month} 1, ${listenTo === "year" ? oldKey : calendars[0].year}`);
                const newDate = new Date(`${calendars[0].month} 1, ${calendars[0].year}`);
                return newDate < oldDate ? -15 : 15;
            }
            return 0;
        })();

        return {
            enterStyle: { opacity: 0, x: direction },
            exitStyle: { opacity: 0, x: direction },
        };
    };

    return {
        prevNextAnimation: animation,
        prevNextAnimationKey: currentKey,
    };
}
