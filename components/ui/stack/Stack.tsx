import S from './Stack.styled';
import React, { ReactNode } from 'react';

export type StackProps = {
    direction?: 'row' | 'column';
    gap?: string;
    justifyContent?: string;
    alignItems?: string;
    flex?: number | string;
    wrap?: boolean;
    children: ReactNode | ReactNode[];
};

const Stack: React.FC<StackProps> = ({
    direction = 'column',
    gap,
    children,
    justifyContent,
    alignItems,
    flex,
    wrap = false,
    ...props
}) => {
    const childrenArray = React.Children.toArray(children);

    return (
        <S.stack
            direction={direction}
            justifyContent={justifyContent}
            alignItems={alignItems}
            gap={gap}
            flex={flex}
            wrap={wrap}
            {...props}>
            {childrenArray.map((child, index) => {
                if (!React.isValidElement(child)) return child;
                return React.cloneElement(child);
            })}
        </S.stack>
    );
};

export default Stack;
