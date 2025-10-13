import { styled, ThemeableStack } from "tamagui";
import { inputVariants } from "./StyledInput";

export const IconContainer = styled(ThemeableStack, {
    name: "IconContainer",
    justify: "center",
    variants: {
        unstyled: {
            false: {
                size: "$true",
                backgroundColor: "$background",
                borderRadius: 0,
            },
        },

        disabled: {
            true: {
                opacity: 0.5,
                // TODO breaking types
                pointerEvents: "none" as any,
            },
        },
        isError: inputVariants.isError,
    } as const,

    defaultVariants: {
        unstyled: process.env.TAMAGUI_HEADLESS === "1",
    },
});