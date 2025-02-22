import styled from 'styled-components/native';

interface StackContainerProps {
    direction?: 'row' | 'column';
    justifyContent?: string;
    alignItems?: string;
    wrap?: boolean;
    gap?: string;
    flex?: number | string;
}

const stack = styled.View<StackContainerProps>`
    flex-direction: ${({ direction }) => direction ?? 'column'};
    justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
    align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
    gap: ${({ gap }) => gap ?? '10px'};
    ${({ flex = '' }) => (flex ? `flex: ${flex};` : '')};
    flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`;

const S = {
    stack,
};

export default S;
