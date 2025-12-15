import { styled, Input } from "tamagui";

export const StyledInput = styled(Input, {
    borderColor: "transparent",
    flex: 1,
    bg: "transparent",
    px: "$3",
    py: "$3",
    height: "auto",
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
});