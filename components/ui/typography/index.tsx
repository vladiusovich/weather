import { NestedColorType } from '@/theme/types/ColorsType';
import S from './Typography.styled';

export type TypoVariant = keyof typeof S;

export type TypographyProps = {
    variant: TypoVariant;
    color?: NestedColorType;
    children?: React.ReactNode;
};

const Typography: React.FC<TypographyProps> = ({
    variant = 'default',
    color = 'regular.100',
    children,
}) => {
    const Typo = S[variant as keyof typeof S];
    return <Typo $color={color}>{children}</Typo>;
};

export default Typography;
