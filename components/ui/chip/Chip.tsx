import React from "react";
import { Pressable } from "react-native";
import { styled, Text, View, XStack } from "tamagui";
import { Trash } from "@tamagui/lucide-icons";

// Define size and style mappings
const sizeStyles = {
    sm: { px: "$3", py: "$2", fontSize: "$2", iconSize: 12 },
    md: { px: "$3", py: "$2", fontSize: "$3", iconSize: 16 },
    lg: { px: "$5", py: "$3", fontSize: "$4", iconSize: 20 },
};

export type SizeVariantType = keyof typeof sizeStyles;
export type ChipVariantType = "solid" | "outline" | "ghost";

// Base styled chip container
const StyledChip = styled(XStack, {
    items: "center",
    justify: "center",
    gap: "$2",
    rounded: 8,
    variants: {
        variant: {
            solid: { bg: "$background02", },
            outline: { bg: "transparent", borderWidth: 1, borderColor: "$color6" },
            ghost: { bg: "transparent" },
        },
        size: Object.fromEntries(
            Object.entries(sizeStyles).map(([key, style]) => [key, style])
        ) as Record<SizeVariantType, any>,
    },
    defaultVariants: {
        variant: "solid",
        size: "sm",
    },
} as const);

// Styled text for chip label
const ChipText = styled(Text, {
    color: "$color",
    variants: {
        size: {
            sm: { fontSize: "$2" },
            md: { fontSize: "$3" },
            lg: { fontSize: "$5" },
        },
    },
    defaultVariants: { size: "sm" },
} as const);

export const CounterView = styled(View, {
    bg: "$background08",
    justify: "center",
    items: "center",
    rounded: 5,
    variants: {
        size: {
            sm: { width: 14, height: 14 },
            md: { width: 16, height: 16 },
            lg: { width: 20, height: 20 },
        },
    },
    defaultVariants: { size: "sm" },
} as const);

const CounterText = styled(Text, {
    color: "$color",
    variants: {
        size: {
            sm: { fontSize: 10 },
            md: { fontSize: "$2" },
            lg: { fontSize: "$3" },
        },
    },
    defaultVariants: { size: "sm" },
} as const);


export const DeleteView = styled(View, {
    opacity: 0.6,
    justify: "center",
    flex: 1,
    items: "center",
    rounded: 999,
    variants: {
        size: {
            sm: { width: 14, height: 14 },
            md: { width: 16, height: 16 },
            lg: { width: 20, height: 20 },
        },
    },
    defaultVariants: { size: "sm" },
} as const);

export interface ChipProps {
    id: string;
    label: string | React.ReactNode;
    counter?: string | React.ReactNode;
    icon?: React.ReactNode;
    size?: SizeVariantType;
    variant?: ChipVariantType;
    pressable?: boolean;
    onPress?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const iconSizeMap = {
    sm: 12,
    md: 14,
    lg: 16,
};

const Chip = ({
    id,
    label,
    counter,
    icon,
    size = "sm",
    variant = "solid",
    onPress,
    onDelete,
}: ChipProps) => {
    return (
        <StyledChip
            // as={pressable ? Pressable : undefined}
            variant={variant}
            size={size}
            onPress={() => onPress?.(id)}
        >
            {icon}
            <ChipText size={size}>{label}</ChipText>
            {counter && (
                <CounterView size={size}>
                    <CounterText size={size}>
                        {counter}
                    </CounterText>
                </CounterView>
            )}
            {onDelete && (
                <Pressable onPress={() => onDelete?.(id)}>
                    <DeleteView size={size}>
                        <Trash size={iconSizeMap[size]} />
                    </DeleteView>
                </Pressable>
            )}
        </StyledChip>
    );
};

export default Chip;
