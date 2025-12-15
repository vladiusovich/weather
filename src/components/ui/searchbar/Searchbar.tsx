import React, { useRef } from "react";
import { isWeb } from "tamagui";
import type { GetRef } from "@tamagui/core";
import { Search, X } from "@tamagui/lucide-icons";
import Input, { InputProps } from "../input/Input";
import { Pressable } from "react-native";

type SearchbarProps = Omit<InputProps, "onChange" | "value" | "onChangeText"> & {
    value?: string
    iconLeft?: React.ElementType<any>;
    iconRight?: React.ReactNode | null;
    clearAriaLabel?: string;
}

export const Searchbar: React.FC<SearchbarProps> = ({
    value,
    onValueChange,
    iconLeft: LeftIcon = Search,
    iconRight,
    clearAriaLabel = "Clear search",
    ...props
}) => {
    const localRef = useRef<GetRef<typeof Input>>(null);

    const handleClear = () => {
        onValueChange?.("");
        const node = localRef.current as any;
        if (isWeb) {
            // HTMLInputElement
            node?.focus?.();
        } else {
            // RN TextInput
            node?.focus?.();
        }
    };

    const ClearIcon = (
        <Pressable onPress={handleClear} hitSlop={10}>
            <X
                aria-label={clearAriaLabel}
                style={isWeb ? { cursor: "pointer" } : undefined}
            />
        </Pressable>
    );

    return (
        <Input
            value={value}
            onValueChange={onValueChange}
            iconLeft={LeftIcon}
            iconRight={value ? ClearIcon : null}
            {...props}
        />
    );
};

export default Searchbar;