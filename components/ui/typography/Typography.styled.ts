import styled from 'styled-components/native';
import { TypoVariant } from '.';
import typographyBase from './typographyBase.styled';
import {
    ColorVariantType,
    NestedColorType,
    GradientColorType,
} from '@/theme/types/ColorsType';

// Helper to retrieve dynamic color
const getColor = (color: NestedColorType, theme: any): string => {
    if (!color) {
        return 'inherit';
    }

    const [variant, priority] = color.split('.') as [
        ColorVariantType,
        GradientColorType,
    ];

    return theme.colors.typography[variant]?.[priority] || 'inherit';
};

// Utility to create a styled typography component
const createTypographyComponent = (component: any) => styled(component)`
    color: ${({ $color, theme }) => getColor($color, theme)};
`;

const typos = Object.keys(typographyBase) as TypoVariant[];

const S: Record<
    keyof typeof typographyBase,
    ReturnType<typeof createTypographyComponent>
> = typos.reduce(
    (acc, key) => {
        acc[key] = createTypographyComponent(typographyBase[key]);
        return acc;
    },
    {} as Record<
        keyof typeof typographyBase,
        ReturnType<typeof createTypographyComponent>
    >,
);

export default S;
