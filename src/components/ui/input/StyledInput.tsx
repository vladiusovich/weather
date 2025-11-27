import { styled, Input } from "tamagui";

export const inputVariants = {
    isError: {
        true: {
            bg: "$red4",
        },
    },
} as const;

export const StyledInput = styled(Input, {
    borderColor: "transparent",
    flex: 1,
    rounded: 12,
    bg: "$background02",
    focusVisibleStyle: {
        outlineColor: "$outlineColor",
        outlineWidth: 0,
        outlineStyle: "solid",
    },
    focusStyle: {
        borderColor: "transparent",
    },
    hoverStyle: {
        borderColor: "transparent",
    },

    variants: { ...inputVariants }
});