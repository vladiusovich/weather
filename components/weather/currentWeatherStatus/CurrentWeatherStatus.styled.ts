import UI from '@/components/ui';
import styled from 'styled-components/native';

const S = {
    view: styled.View`
        padding: 15px;
        background-color: ${({ theme }) => theme.colors.secondary[600]};
        border-radius: 15px;
    `,
    stack: styled(UI.Stack)`
        width: 100%;
    `,
};

export default S;
