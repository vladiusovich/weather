import React from "react";
import { Button as UiButton, ButtonProps } from "tamagui";

const Button: React.FC<ButtonProps> = ({
    disabled = false,
    ...props
}) => {
    return <UiButton
        {...props}
        bg={disabled ? "$background0" : undefined}
        color={disabled ? "$accent1" : undefined}
        disabled={disabled}
    />;
};

export default Button;
