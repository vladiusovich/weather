import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { G, Line as SvgLine, Path, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3';

type Point = { x: number; y: number };

type Props = {
    width: number;
    height: number;
    data: Point[];
    color?: string;
    strokeWidth?: number;
    padding?: { top: number; right: number; bottom: number; left: number };
    xTicks?: number;
    yTicks?: number;
    showGrid?: boolean;
    time?: boolean; // если true, x = timestamp, рендерим как время
};

const MultiLineBarChart: React.FC<Props> = ({
    width,
    height,
    data,
    color = '#2563eb',
    strokeWidth = 2,
    padding = { top: 12, right: 36, bottom: 22, left: 36 },
    xTicks = 5,
    yTicks = 5,
    showGrid = true,
    time = false,
}) => {
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;

    // 1) Домены данных
    const xDomain = useMemo(() => {
        const ext = d3.extent(data, d => d.x) as [number, number];
        if (ext[0] === ext[1]) return [ext[0], ext[0] + 1];
        return ext;
    }, [data]);

    const yDomain = useMemo(() => {
        const ext = d3.extent(data, d => d.y) as [number, number];
        if (ext[0] === ext[1]) return [ext[0] - 1, ext[1] + 1];
        return ext;
    }, [data]);

    // 2) Шкалы
    const xScale = useMemo(
        () => {
            return (time ? d3.scaleTime() : d3.scaleLinear())
                .domain(time ? (xDomain.map(v => new Date(v)) as any) : xDomain)
                .range([0, innerW]);
        },
        [xDomain, innerW, time]
    );

    const yScale = useMemo(
        () => d3.scaleLinear().domain(yDomain).nice().range([innerH, 0]),
        [yDomain, innerH]
    );

    // 3) Путь линии
    const pathD = useMemo(() => {
        const lineGen = d3
            .line<Point>()
            .x(d => (time ? (xScale(new Date(d.x)) as number) : (xScale(d.x) as number)))
            .y(d => yScale(d.y))
            .curve(d3.curveMonotoneX);
        return lineGen(data) ?? '';
    }, [data, xScale, yScale, time]);

    // 4) Тики осей
    const xTickValues = useMemo(
        () => (time ? (xScale as d3.ScaleTime<number, number>).ticks(xTicks) : (xScale as any).ticks(xTicks)),
        [xScale, xTicks, time]
    );
    const yTickValues = useMemo(() => yScale.ticks(yTicks), [yScale, yTicks]);

    const fmtX = useMemo(
        () => (time ? d3.timeFormat('%d.%m') : (v: number) => String(v)),
        [time]
    );
    const fmtY = (v: number) => {
        const n = Math.abs(v) < 1000 ? v : d3.format('.2s')(v);
        return Number.isInteger(v) ? String(v) : String((+n)?.toFixed?.(2) ?? n);
    };

    return (
        <View>
            <Svg width={width} height={height}>
                <G x={padding.left} y={padding.top}>
                    {/* grid */}
                    {showGrid &&
                        yTickValues.map((t, i) => (
                            <SvgLine
                                key={`g-${i}`}
                                x1={0}
                                x2={innerW}
                                y1={yScale(t)}
                                y2={yScale(t)}
                                stroke="#e5e7eb"
                                strokeWidth={1}
                            />
                        ))}

                    {/* линия */}
                    <Path d={pathD} fill="none" stroke={color} strokeWidth={strokeWidth} />

                    {/* Ось X */}
                    <SvgLine x1={0} x2={innerW} y1={innerH} y2={innerH} stroke="#374151" strokeWidth={1} />
                    {xTickValues.map((t: any, i: number) => {
                        const x = time ? (xScale(t) as number) : (xScale(t) as number);
                        return (
                            <G key={`xt-${i}`} x={x} y={innerH}>
                                <SvgLine x1={0} x2={0} y1={0} y2={6} stroke="#374151" strokeWidth={1} />
                                <SvgText y={16} fontSize={10} fill="#374151" textAnchor="middle">
                                    {fmtX(time ? t as Date : t)}
                                </SvgText>
                            </G>
                        );
                    })}

                    {/* Ось Y */}
                    <SvgLine x1={0} x2={0} y1={0} y2={innerH} stroke="#374151" strokeWidth={1} />
                    {yTickValues.map((t, i) => {
                        const y = yScale(t);
                        return (
                            <G key={`yt-${i}`} x={0} y={y}>
                                <SvgLine x1={-6} x2={0} y1={0} y2={0} stroke="#374151" strokeWidth={1} />
                                <SvgText x={-8} fontSize={10} fill="#374151" textAnchor="end" alignmentBaseline="middle">
                                    {fmtY(t)}
                                </SvgText>
                            </G>
                        );
                    })}
                </G>
            </Svg>
        </View>
    );
};

export default MultiLineBarChart;