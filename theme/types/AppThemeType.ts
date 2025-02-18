import {
    GradientColorTypeColorMapping,
    LargeGradientColorMapping,
    TypographyColors,
} from './ColorsType';

interface ColorsType {
    primary: LargeGradientColorMapping;
    secondary: LargeGradientColorMapping;
    typography: TypographyColors;
    blur: string;
    background: GradientColorTypeColorMapping;
}

interface FontSizeType {
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}

interface SpacingsType {
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}

interface AppThemeType {
    colors: ColorsType;
    fontSize: FontSizeType;
    spacings: SpacingsType;
}

export default AppThemeType;
