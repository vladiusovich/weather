import { TypographyColors } from './ColorsType';

interface ColorGradient {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
}

interface Colors {
    primary: ColorGradient;
    secondary: ColorGradient;
    typography: TypographyColors;
    blur: string;
}

interface FontSize {
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}

interface Spacings {
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}

interface AppThemeType {
    colors: Colors;
    fontSize: FontSize;
    spacings: Spacings;
}

export default AppThemeType;
