export type ColorVariantType = 'regular' | 'warning';

export type GradientColorType = '100' | '200';

export type LargeColorGradientType =
    | GradientColorType
    | '300'
    | '400'
    | '500'
    | '600'
    | '700';

export type GradientColorTypeColorMapping = {
    [key in GradientColorType]: string;
};

export type LargeGradientColorMapping = {
    [key in LargeColorGradientType]: string;
};

export type TypographyColors = {
    [key in ColorVariantType]: GradientColorTypeColorMapping;
};

export type NestedColorType = `${ColorVariantType}.${GradientColorType}`;
