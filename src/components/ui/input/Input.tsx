import React, { FunctionComponent, useState } from "react";

import {
    composeEventHandlers,
    getFontSize,
    InputProps as TamaInputProps,
    useGetThemedIcon,
} from "tamagui";
import { IconContainer } from "./IconContainer";
import { StyledInput } from "./StyledInput";
import InputContainer from "./InputContainer";

type Variant = "outlined";
type InputComponentIconProps = { color?: any; size?: any };
type IconProp = JSX.Element | FunctionComponent<InputComponentIconProps> | null;

export interface InputProps extends Exclude<TamaInputProps, "onChangeText"> {
    variant?: Variant
    onValueChange?: (text: string) => void;
    iconLeft?: IconProp
    iconRight?: IconProp
    scaleIcon?: number
    error?: boolean
}

export const Input: React.FC<InputProps> = ({
    onFocus,
    onBlur,
    onValueChange,
    iconLeft,
    iconRight,
    scaleIcon = 1.3,
    error = false,
    variant = "outlined",
    color,
    bg,
    size,
    fontSize,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const iconSize = getFontSize(fontSize as any) * scaleIcon;
    const getThemedIcon = useGetThemedIcon({ size: iconSize, color: color as any });
    const [themedIconLeft, themedIconRight] = [iconLeft, iconRight].map(getThemedIcon);

    return (
        <InputContainer
            variant={variant}
            isFocused={isFocused}
            isError={error}
            bg={bg}
        >
            {themedIconLeft && (
                <IconContainer
                    paddingInlineStart={"$3"}
                >
                    {themedIconLeft}
                </IconContainer>
            )}

            <StyledInput
                {...props}
                onFocus={composeEventHandlers(onFocus, () => setIsFocused(true))}
                onBlur={composeEventHandlers(onBlur, () => setIsFocused(false))}
                onChangeText={onValueChange}
                color={color}
                fontSize={fontSize}
            />

            {themedIconRight && (
                <IconContainer
                    paddingInlineEnd={"$3"}
                >
                    {themedIconRight}
                </IconContainer>
            )}
        </InputContainer>
    );
};


export default Input;