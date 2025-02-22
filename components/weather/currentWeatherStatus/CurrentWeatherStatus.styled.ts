import styled from 'styled-components/native';

const S = {
    view: styled.View`
        width: 100%;
        padding: 15px;
        background-color: ${({ theme }) => theme.colors.secondary[600]};
        border-radius: 15px;
    `,
};

export default S;
