import { createContext, useContext } from 'react';
import { XScale, YScale, Padding, ChartTheme } from '../types';

type ChartContextType = {
    xScale: XScale;
    yScales: Record<string, YScale>; // несколько осей Y по id
    innerW: number;
    innerH: number;
    yAxisOffsets: number[],
    padding: Padding;
    theme: ChartTheme;
};

export const ChartContext = createContext<ChartContextType | null>(null);

const useChart = () => {
    const ctx = useContext(ChartContext);
    if (!ctx) throw new Error('useScales must be used within <Chart>');
    return ctx;
};

export default useChart;