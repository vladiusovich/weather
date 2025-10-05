// =====================
// Context for scales and layout
// =====================

import { createContext, useContext } from 'react';
import { XScale, YScale, Padding, ChartTheme } from '../types';

type ScalesContextType = {
    xScale: XScale;
    yScales: Record<string, YScale>; // несколько осей Y по id
    innerW: number;
    innerH: number;
    padding: Padding;
    theme: ChartTheme;
};

export const ScalesContext = createContext<ScalesContextType | null>(null);

const useScales = () => {
    const ctx = useContext(ScalesContext);
    if (!ctx) throw new Error('useScales must be used within <Chart>');
    return ctx;
};

export default useScales;