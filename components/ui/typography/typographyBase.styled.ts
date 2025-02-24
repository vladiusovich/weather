import styled from 'styled-components/native';

const typographyBase = {
    header: styled.Text`
        font-size: ${({ theme }) => theme.fontSize.large};
        font-weight: 400;
    `,
    default: styled.Text`
        font-size: ${({ theme }) => theme.fontSize.medium};
        font-weight: 400;
    `,
    small: styled.Text`
        font-size: ${({ theme }) => theme.fontSize.small};
        font-weight: 400;
    `,
    xsmall: styled.Text`
        font-size: ${({ theme }) => theme.fontSize.xsmall};
        font-weight: 400;
    `,
    semibold: styled.Text`
        font-size: ${({ theme }) => theme.fontSize.default};
        font-weight: 500;
    `,
    bold: styled.Text`
        font-size: ${({ theme }) => theme.fontSize.default};
        font-weight: 600;
    `,
};

export default typographyBase;
