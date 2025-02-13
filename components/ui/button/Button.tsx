import * as St from './Button.styled';
import React from 'react';
import { useTheme } from 'styled-components/native';
import { removeUnitFromTheme } from '@/utils/theme';
import Typography from '../typography';

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
            <Typography variant='xsmall' color='regular.100'>
                {label}
            </Typography>
        </St.Button>
    );
};

export default Button;
