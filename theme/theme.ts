import { RFPercentage } from 'react-native-responsive-fontsize';
import AppThemeType from './types/AppThemeType';
import { backgroundColors } from './theme.base';

const theme: AppThemeType = {
    colors: {
        primary: {
            100: '#F7F6FC',
            200: '#EFEEF9',
            300: '#DFDCF3',
            400: '#C0B9E7',
            500: '#A097DB',
            600: '#1a1a1a80',
            700: '#6151C3',
        },
        secondary: {
            100: '#F3F3F3',
            200: '#E6E6E7',
            300: '#CECDD0',
            400: '#9C9CA1',
            500: '#6B6A71',
            600: '#1a1a1a80',
            700: '#080713',
        },
        typography: {
            regular: {
                100: '#f3f3f3',
                200: '#111111',
            },
            warning: {
                100: '#000000',
                200: '#FFFFFF',
            },
        },
        blur: '#F3F3F399',
        background: backgroundColors,
    },
    fontSize: {
        extraLarge: `${32}px`,
        large: `${24}px`,
        medium: `${20}px`,
        default: `${16}px`,
        small: `${14}px`,
        xsmall: `${12}px`,
    },
    spacings: {
        small: '4px',
        medium: '8px',
        large: '16px',
        extraLarge: '24px',
    },
};

export default theme;
