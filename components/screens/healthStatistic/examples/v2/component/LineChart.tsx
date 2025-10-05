/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { G, Rect } from 'react-native-svg';
import * as d3 from 'd3';
import useScales, { ScalesContext } from './hooks/useScales';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Grid from './Grid';
import { ChartProps, ChartTheme, DataSet, Padding, ScaleKind, XScale, YScale } from './types';
import { Lines } from './Lines';

const DEFAULT_PADDING: Padding = { top: 12, right: 36, bottom: 22, left: 36 };
const DEFAULT_THEME: ChartTheme = {
    axisColor: '#bcbcbc8e',
    gridColor: '#ffffff21',
    lineColor: '#2563eb',
    labelColor: '#c5c5c5ff',
};

export const Chart: React.FC<ChartProps> = ({
    dimensions, dataDomain, kinds = { x: 'linear' },
    yDomains, niceY = true, theme, children,
}) => {
    const padding = { ...DEFAULT_PADDING, ...(dimensions.padding ?? {}) };
    const { width, height } = dimensions;
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;

    const xScale = useMemo<XScale>(() => {
        if (kinds.x === 'time') {
            const d = dataDomain.x.map(v => (v instanceof Date ? v : new Date(v))) as [Date, Date];
            return d3.scaleTime().domain(d).range([0, innerW]);
        }
        return d3.scaleLinear().domain(dataDomain.x as [number, number]).range([0, innerW]);
    }, [kinds.x, dataDomain.x, innerW]);

    const yScales = useMemo<Record<string, YScale>>(() => {
        const obj: Record<string, YScale> = {};
        Object.entries(yDomains).forEach(([id, dom]) => {
            const s = d3.scaleLinear().domain(dom).range([innerH, 0]);
            obj[id] = niceY ? s.nice() : s;
        });
        return obj;
    }, [yDomains, innerH, niceY]);

    const themeFinal = { ...DEFAULT_THEME, ...(theme ?? {}) };

    return (
        <View style={{ width, height }}>
            <Svg width={width} height={height}>
                <G x={padding.left} y={padding.top}>
                    <ScalesContext.Provider value={{ xScale, yScales, innerW, innerH, padding, theme: themeFinal }}>
                        {children}
                    </ScalesContext.Provider>
                </G>
            </Svg>
        </View>
    );
};

// =====================
// Helper overlay to capture gestures later (optional now)
// =====================
export const HitRect: React.FC<{ onPress?: (x: number, y: number) => void } & React.ComponentProps<typeof Rect>> = ({ onPress, ...rest }) => {
    const { innerW, innerH } = useScales();
    return <Rect width={innerW} height={innerH} opacity={0} {...rest} />;
};

export type SimpleLineChartProps = {
    width: number;
    height: number;
    dataSet: DataSet[];
    xKind?: ScaleKind;
    padding?: Padding;
};

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ width, height, dataSet, xKind = 'linear', padding }) => {
    const all = dataSet.flatMap(s => s.data);
    const xNums = all.map(p => xKind === 'time' ? +new Date(p.x as any) : (p.x as number));
    const [xMin, xMax] = d3.extent(xNums) as [number, number];
    const xDomain: [number | Date, number | Date] = xKind === 'time'
        ? [new Date(xMin), new Date(xMax === xMin ? xMax + 1 : xMax)]
        : [xMin, xMax === xMin ? xMax + 1 : xMax];

    const groups: Record<string, number[]> = {};

    dataSet.forEach(s => {
        const id = s.yAxisId ?? 'y0';
        if (!groups[id]) groups[id] = [];
        s.data.forEach((p: { y: number; }) => groups[id].push(p.y));
    });

    const yDomains: Record<string, [number, number]> = {};
    Object.entries(groups).forEach(([id, arr]) => {
        const [mn, mx] = d3.extent(arr) as [number, number];
        const pad = (mx - mn || 1) * 0.05;
        yDomains[id] = [mn - pad, mx + pad];
    });

    return (
        <Chart dimensions={{ width, height, padding }} dataDomain={{ x: xDomain }} kinds={{ x: xKind }} yDomains={yDomains}>
            <Grid yTicks={5} yAxisId={Object.keys(yDomains)[0]} />
            <Lines dataSet={dataSet} />
            <XAxis ticks={5} />
            {Object.keys(yDomains).map((id, idx) => (
                <YAxis key={id} axisId={id} ticks={5} side={idx === 0 ? 'left' : 'right'} offset={idx > 1 ? (idx - 1) * 28 : 0} />
            ))}
        </Chart>
    );
};
