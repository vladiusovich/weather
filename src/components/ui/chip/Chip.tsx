import React from "react";
import StyledChip from "./StyledChip";
import ChipLabel from "./ChipLabel";
import Counter from "./Counter";

export type SizeVariantType = "sm" | "md" | "lg";
export type ChipVariantType = "solid" | "outline";

export interface ChipProps {
    id: string;
    label: string | React.ReactNode;
    counter?: string | React.ReactNode;
    icon?: React.ReactNode;
    size?: SizeVariantType;
    variant?: ChipVariantType;
    pressable?: boolean;
    selected?: boolean;
    onPress?: (id: string) => void;
}

const Chip = ({
    id,
    label,
    counter,
    icon,
    size = "md",
    variant = "outline",
    selected = false,
    onPress,
}: ChipProps) => {
    return (
        <StyledChip
            variant={variant}
            size={size}
            onPress={() => onPress?.(id)}
            selected={selected}
        >
            {icon}
            <ChipLabel size={size}>
                {label}
            </ChipLabel>
            <Counter size={size}>
                {counter}
            </Counter>
        </StyledChip>
    );
};

export default Chip;
