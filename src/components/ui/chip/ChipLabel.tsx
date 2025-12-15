import { styled, Text } from "tamagui";

const ChipLabel = styled(Text, {
    color: "$color",
    variants: {
        size: {
            sm: { fontSize: "$2" },
            md: { fontSize: "$4" },
            lg: { fontSize: "$5" },
        },
    },
    defaultVariants: { size: "sm" },
} as const);


export default ChipLabel;
