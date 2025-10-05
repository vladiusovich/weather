import { PropsWithChildren } from 'react';

export type Point = { x: number | Date; y: number };

export type Padding = { top: number; right: number; bottom: number; left: number };

export type ScaleKind = 'linear' | 'time';

export type ChartTheme = {
    axisColor: string;
    gridColor: string;
    lineColor: string;
    labelColor: string;
};

export type ChartDimensions = {
    width: number;
    height: number;
    padding?: Padding;
};


export type GridProps = {
    yTicks?: number;
};

export type AxisProps = {
    ticks?: number;
    format?: (v: any) => string;
    showTicks?: boolean;
    showLine?: boolean;
};

export type DataSet = {
    id?: string;
    data: Point[];
    color?: string;
    strokeWidth?: number;
    yAxisId?: string;
};

export type XScale = d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;
export type YScale = d3.ScaleLinear<number, number>;

export type ChartProps = PropsWithChildren<{
    dimensions: ChartDimensions;
    dataDomain: { x: [number | Date, number | Date] };
    kinds?: { x: ScaleKind };
    yDomains: Record<string, [number, number]>; // axisId -> domain
    niceY?: boolean;
    theme?: Partial<ChartTheme>;
}>;
