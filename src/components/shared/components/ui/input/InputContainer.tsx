import { styled, XStack } from "tamagui";

const radius = 12;

const InputContainer = styled(XStack, {
    name: "Input",
    overflow: "hidden",
    borderWidth: "$0.5",
    borderBottomStartRadius: radius,
    borderBottomEndRadius: radius,
    borderTopStartRadius: radius,
    borderTopEndRadius: radius,
    variants: {
        unstyled: {
            false: {
                height: "auto",
                hoverStyle: {
                    borderColor: "$color7",
                },
            },
        },
        variant: {
            outlined: {
                borderColor: "$borderColor",
            },
        },
        isFocused: {
            true: {
                // This should have been the outlineColor, need to understand the theme better
                outlineColor: "$color7",
                outlineWidth: 2,
                outlineStyle: "solid",
            },
        },
        isError: {
            true: {
                borderColor: "$red6",
                outlineColor: "$red6",
                hoverStyle: {
                    borderColor: "$red6",
                },
            },
        },
    } as const,

    defaultVariants: {
        unstyled: process.env.TAMAGUI_HEADLESS === "1",
    },
});

export default InputContainer;
