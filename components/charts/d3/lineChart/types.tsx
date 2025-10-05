import { PropsWithChildren } from 'react';
import * as d3 from 'd3';

export type Point = {
    x: number | Date;
    y: number;
};

export type Padding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

export type ScaleKind = 'linear' | 'time';

export type ChartTheme = {
    axisColor: string;
    gridColor: string;
    lineColor: string;
    labelColor: string;
};

export type ChartDimensions = {
    width?: number;
    height: number;
    padding?: Partial<Padding>;
};

export type GridProps = {
    yTicks?: number;
    yAxisId?: string;
};

export type AxisProps = {
    ticks?: number;
    format?: (v: any) => string;
    showTicks?: boolean;
    showLine?: boolean;
};

export type YAxisProps = AxisProps & {
    axisId: string;
    side?: 'left' | 'right';
    offset?: number;
};

export type DataSet = {
    id?: string;
    data: Point[];
    color?: string;
    strokeWidth?: number;
    yAxisId?: string;
};

// Improved type definitions for scales
export type XScale = d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;
export type YScale = d3.ScaleLinear<number, number>;

export type ScalesContextValue = {
    xScale: XScale;
    yScales: Record<string, YScale>;
    innerW: number;
    innerH: number;
    padding: Padding;
    theme: ChartTheme;
};

export type ChartProps = PropsWithChildren<{
    dimensions: ChartDimensions;
    dataDomain: { x: [number | Date, number | Date] };
    kinds?: { x: ScaleKind };
    yDomains: Record<string, [number, number]>;
    niceY?: boolean;
    theme?: Partial<ChartTheme>;
    zoomPanConfig?: ZoomPanConfig;
    enableGestures?: boolean;
}>;

export type ZoomPanState = {
    scale: number;
    translateX: number;
    translateY: number;
};

export type ZoomPanActions = {
    zoomIn: () => void;
    zoomOut: () => void;
    panLeft: () => void;
    panRight: () => void;
    panUp: () => void;
    panDown: () => void;
    reset: () => void;
};

export type ZoomPanConfig = {
    minScale?: number;
    maxScale?: number;
    zoomStep?: number;
    panStep?: number;
};

export type SimpleLineChartProps = {
    width?: number;
    height: number;
    dataSet: DataSet[];
    xKind?: ScaleKind;
    padding?: Partial<Padding>;
    zoomPanConfig?: ZoomPanConfig;
    enableGestures?: boolean;
};