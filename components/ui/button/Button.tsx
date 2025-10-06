import React from "react";
import { Button as UiButton, ButtonProps } from "tamagui";

const Button: React.FC<ButtonProps> = ({
    disabled = false,
    ...props
}) => {

    return <UiButton
        {...props}
        bg={disabled ? "$black3" : undefined}
        color={disabled ? "$white10" : undefined}
        disabled={disabled}
    />;
};

export default Button;
