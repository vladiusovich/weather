import S from './Stack.styled';
import React, { ReactNode } from 'react';

type Props = {
    direction?: 'row' | 'column';
    gap?: string;
    justifyContent?: string;
    alignItems?: string;
    children: ReactNode | ReactNode[];
};

const Stack: React.FC<Props> = ({
    direction = 'column',
    gap,
    children,
    justifyContent,
    alignItems,
    ...props
}) => {
    const childrenArray = React.Children.toArray(children);

    return (
        <S.stack
            direction={direction}
            justifyContent={justifyContent}
            alignItems={alignItems}
            gap={gap}
            {...props}>
            {childrenArray.map((child, index) => {
                if (!React.isValidElement(child)) return child;
                return React.cloneElement(child);
            })}
        </S.stack>
    );
};

export default Stack;
