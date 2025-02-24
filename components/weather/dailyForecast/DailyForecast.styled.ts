import UI from '@/components/ui';
import styled from 'styled-components/native';

const S = {
    view: styled.View`
        width: 100%;
        height: 220px;
        padding: 15px;
        background-color: ${({ theme }) => theme.colors.secondary[600]};
        border-radius: 15px;
    `,
    stack: styled(UI.Stack)`
        flex: 1;
    `,
};

export default S;
