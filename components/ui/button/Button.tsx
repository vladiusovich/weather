import * as St from './Button.styled';
import React from 'react';
import { useTheme } from 'styled-components';
import { removeUnitFromTheme } from '@/utils/theme';

type Props = {
    disabled?: boolean;
    outlined?: boolean;
    onPress?: () => void;
    label: string;
    iconColor?: string;
    variant?: 'primary' | 'secondary' | 'solid';
};

const Button: React.FC<Props> = ({
    disabled,
    outlined,
    onPress,
    label,
    iconColor,
}) => {
    const theme = useTheme();
    return (
        <St.Button
            disabled={disabled}
            outlined={outlined}
            onPress={onPress}
            // style={{ marginVertical: removeUnitFromTheme(theme.spacings.large) }}
        >
            <St.Text>{label}</St.Text>
        </St.Button>
    );
};

export default Button;
