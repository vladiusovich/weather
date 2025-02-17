import styled, { css } from 'styled-components/native';

type Props = {
    disabled?: boolean;
    outlined?: boolean;
};

const ButtonOutlinedStyle = css<Props>`
    border-width: 1px;
    border-color: ${({ theme, disabled }) =>
        disabled ? theme.colors.primary[600] : theme.colors.primary[600]};
`;

const ButtonDefaultStyle = css<Props>`
    background-color: ${({ theme, disabled }) =>
        disabled ? theme.colors.primary[600] : theme.colors.primary[600]};
`;

export const Button = styled.TouchableOpacity<Props>`
    min-width: 130px;
    height: 40px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    ${({ outlined }) => (outlined ? ButtonOutlinedStyle : ButtonDefaultStyle)}
`;

export const Text = styled.Text<Props>`
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme, outlined }) =>
        outlined ? theme.colors.primary[300] : theme.colors.secondary[100]};
`;
