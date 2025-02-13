export type ColorVariantType = 'regular' | 'warning';

export type GradientColorType = '100' | '200';

export type GradientColorMapping = {
    [key in GradientColorType]: string;
};

export type TypographyColors = {
    [key in ColorVariantType]: GradientColorMapping;
};

export type NestedColorType = `${ColorVariantType}.${GradientColorType}`;
