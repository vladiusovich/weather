// src/styled.d.ts
import 'styled-components/native'; // Ensures the native types are loaded
import AppThemeType from './theme/types/AppThemeType';

declare module 'styled-components/native' {
    export interface DefaultTheme extends AppThemeType { }
}
