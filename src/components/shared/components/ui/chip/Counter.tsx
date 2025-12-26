import { styled, Text, View } from "tamagui";
import { ChipProps } from "./Chip";

const CounterView = styled(View, {
    bg: "$background04",
    justify: "center",
    items: "center",
    rounded: 24,
    variants: {
        size: {
            sm: { width: 14, height: 14 },
            md: { width: 16, height: 16 },
            lg: { width: 20, height: 20 },
        },
    },
    defaultVariants: { size: "sm" },
} as const);

const CounterLabel = styled(Text, {
    color: "$color",
    fontWeight: 800,
    variants: {
        size: {
            sm: { fontSize: 10 },
            md: { fontSize: "$3" },
            lg: { fontSize: "$3" },
        },
    },
    defaultVariants: { size: "sm" },
} as const);


interface CounterProps extends Pick<ChipProps, "size"> {
    children?: string | React.ReactNode;
}

const Counter: React.FC<CounterProps> = ({
    size = "md",
    children,
}) => {
    if (!children) {
        return null;
    }

    return (
        <CounterView size={size}>
            <CounterLabel size={size}>
                {children}
            </CounterLabel>
        </CounterView>
    );
};

export default Counter;