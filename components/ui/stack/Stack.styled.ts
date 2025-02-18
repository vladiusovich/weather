import styled from 'styled-components/native';

interface StackContainerProps {
    direction?: 'row' | 'column';
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    flex?: number | string;
}

const stack = styled.View<StackContainerProps>`
    width: 100%;
    flex-direction: ${({ direction }) => direction ?? 'column'};
    justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
    align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
    gap: ${({ gap }) => gap ?? '10px'};
    ${({ flex = '' }) => (flex ? `flex: ${flex};` : '')};
`;

const S = {
    stack,
};

export default S;
