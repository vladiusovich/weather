import React, { useRef } from "react";
import { isWeb } from "tamagui";
import { composeRefs } from "@tamagui/compose-refs";
import type { GetRef } from "@tamagui/core";
import { Search, X } from "@tamagui/lucide-icons";
import Input, { MnInputProps } from "../input/Input";

type SearchbarProps = Omit<MnInputProps, "onChange" | "value" | "onChangeText"> & {
    value: string
    onChangeText: (text: string) => void;
    iconLeft?: React.ElementType<any>;
    iconRight?: React.ReactNode | null;
    clearAriaLabel?: string;
}

export const Searchbar = React.forwardRef<GetRef<typeof Input>, SearchbarProps>(
    (
        {
            value,
            onChangeText,
            iconLeft: LeftIcon = Search,
            iconRight,
            clearAriaLabel = "Clear search",
            ...rest
        },
        forwardedRef
    ) => {
        const localRef = useRef<GetRef<typeof Input>>(null);
        const ref = composeRefs(forwardedRef, localRef);

        const handleClear = () => {
            onChangeText("");
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
            <X
                aria-label={clearAriaLabel}
                {...(isWeb ? { onClick: handleClear } : { onPress: handleClear })}
                style={isWeb ? { cursor: "pointer" } : undefined}
            />
        );

        return (
            <Input
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                iconLeft={LeftIcon}
                iconRight={iconRight ?? (value ? ClearIcon : null)}
                {...rest}
            />
        );
    }
);

Searchbar.displayName = "Searchbar";

export default Searchbar;