import { css } from 'styled-components';
import styled from 'styled-components/native';

const view = css`
    flex: 1;
    padding: ${({ theme }) => theme.spacings.medium};
    background-color: ${({ theme }) => theme.colors.background[100]};
`;

const layout = {
    view: styled.View`
        ${view}
    `,
};

export default layout;
