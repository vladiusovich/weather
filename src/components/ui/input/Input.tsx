import React, { FunctionComponent, useState } from "react";

import {
    composeEventHandlers,
    getFontSize,
    Group,
    styled,
    InputProps as TamaInputProps,
    useComposedRefs,
    useGetThemedIcon,
    useProps,
    XGroup,
} from "tamagui";
import { IconContainer } from "./IconContainer";
import { StyledInput } from "./StyledInput";

type MnInputVariant = "outlined"
type InputComponentIconProps = { color?: any; size?: any }
type IconProp = JSX.Element | FunctionComponent<InputComponentIconProps> | null

export interface MnInputProps extends TamaInputProps {
    iconLeft?: IconProp
    iconRight?: IconProp
    scaleIcon?: number
    variant?: MnInputVariant
    error?: boolean
}

const XGroupStyled = styled(Group, {
    name: "Input",
    overflow: "hidden",
    rounded: 12,
    variants: {
        unstyled: {
            false: {
                height: "auto",
                borderRadius: 0,
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
                borderColor: "red",
                outlineColor: "red",
                hoverStyle: {
                    borderColor: "red",
                },
            },
        },
    } as const,

    defaultVariants: {
        unstyled: process.env.TAMAGUI_HEADLESS === "1",
    },
});

/**
 * MnInput Component - A customizable input field with support for icons, error states, and helper text.
 *
 * - Supports left and right icons, both of which can be customized in size and color using the `useGetThemedIcon` hook.
 * - The input field handles focus and blur events, with styles changing when the input is focused or in an error state.
 * - Includes a helper text and error text display for additional context or validation feedback.
 *
 * Props:
 * - `iconLeft` and `iconRight`: Icons placed on either side of the input field. They can be a JSX element or a function component.
 * - `scaleIcon` and `scaleSpace`: Control the size of the icons and the space around them.
 * - `variant`: Customizable input border style (e.g., 'outlined').
 * - `roundedBorder`: Enables rounded borders around the input.
 * - `error` and `errorText`: Display error styling and message when an error occurs.
 * - `helperText`: Additional text displayed below the input for guidance.
 * - Inherits other standard input props via `TamaInputProps`.
 *
 * This component uses Tamagui's styled components and handles various input states such as focus and error using local state (`useState`).
 *
 * @param {MnInputProps} inProps - The properties passed to MnInput for configuration.
 *
 * @returns {JSX.Element} A styled input component with optional icons, error handling, and helper text.
 *
 *
 */

export const Input = React.forwardRef((inProps: MnInputProps, forwardedRef) => {
    const {
        onFocus,
        onBlur,
        variant = "outlined",
        iconLeft,
        iconRight,
        scaleIcon = 1,
        error = false,
        color,
        space,
        ...rest
    } = useProps(inProps);
    const [isFocused, setIsFocused] = useState(false);
    const ref = React.useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs<any>(forwardedRef, ref);
    const size = inProps.size || "$true";
    const iconSize = getFontSize(size as any) * scaleIcon;
    const getThemedIcon = useGetThemedIcon({ size: iconSize, color: color as any });
    const [themedIconLeft, themedIconRight] = [iconLeft, iconRight].map(getThemedIcon);

    return (
        <XGroupStyled
            orientation="horizontal"
            variant={variant}
            isFocused={isFocused}
            isError={error}
        >
            {themedIconLeft && (
                <Group.Item>
                    <IconContainer
                        isError={error}
                        paddingInlineStart={"$3"}>{themedIconLeft}</IconContainer>
                </Group.Item>
            )}

            <XGroup.Item>
                <StyledInput
                    ref={composedRefs}
                    onFocus={composeEventHandlers(onFocus, () => {
                        setIsFocused(true);
                    })}
                    onBlur={composeEventHandlers(onBlur, () => {
                        setIsFocused(false);
                    })}
                    height={"auto"}
                    isError={error}
                    {...(iconLeft && { paddingLeft: 4 })}
                    {...(iconRight && { paddingRight: 0 })}
                    {...rest}
                />
            </XGroup.Item>

            {themedIconRight && (
                <XGroup.Item>
                    <IconContainer
                        isError={error}
                        paddingInlineEnd={"$3"}>{themedIconRight}</IconContainer>
                </XGroup.Item>
            )}

        </XGroupStyled>
    );
});

Input.displayName = "Input";

export default Input;