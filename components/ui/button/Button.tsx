import * as St from './Button.styled';
import React from 'react';
import Typography from '../typography';

export type ButtonProps = {
    disabled?: boolean;
    outlined?: boolean;
    onPress?: () => void;
    label: string;
    iconColor?: string;
    variant?: 'primary' | 'secondary' | 'solid';
};

const Button: React.FC<ButtonProps> = ({
    disabled,
    outlined,
    onPress,
    label,
    iconColor,
}) => {
    return (
        <St.Button disabled={disabled} outlined={outlined} onPress={onPress}>
            <Typography variant='xsmall' color='regular.100'>
                {label}
            </Typography>
        </St.Button>
    );
};

export default Button;
