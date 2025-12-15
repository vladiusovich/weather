import { styled, XStack } from "tamagui";

const StyledChip = styled(XStack, {
    items: "center",
    justify: "center",
    gap: "$2",
    rounded: 24,
    variants: {
        variant: {
            solid: (_val, { props }) => {
                const { selected } = (props as { selected?: boolean });
                if (selected) {
                    return { bg: "$background08" };
                }
                return { bg: "$background04" };
            },
            outline: (_val, { props }) => {
                const styles = {
                    bg: "transparent",
                    borderWidth: 1,
                };

                const { selected } = (props as { selected?: boolean });
                if (selected) {
                    return {
                        ...styles,
                        borderColor: "$green6",
                        bg: "$green2",
                    };
                }
                return { ...styles, borderColor: "$color6" };
            },
        },
        selected: {
            true: {},
            false: {},
        },
        size: {
            sm: { px: "$3", py: "$2" },
            md: { px: "$3", py: 10 },
            lg: { px: "$5", py: "$3" },
        }
    },
    defaultVariants: {
        variant: "solid",
        size: "sm",
    },
} as const);

export default StyledChip;
