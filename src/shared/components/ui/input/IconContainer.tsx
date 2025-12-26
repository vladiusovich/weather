import { styled, View } from "tamagui";

export const IconContainer = styled(View, {
    name: "IconContainer",
    justify: "center",
    variants: {
        disabled: {
            true: {
                opacity: 0.5,
                // TODO breaking types
                pointerEvents: "none" as any,
            },
        },
    } as const,
});