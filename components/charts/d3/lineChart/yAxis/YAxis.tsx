/* eslint-disable indent */
import React, { useMemo } from 'react';
import useChart from '../context/useChart';
import { G, Line as SvgLine, Text as SvgText } from 'react-native-svg';
import { YAxisProps } from '../types';
import { getDefaultYFormatter } from '../utils';
import { CHART_CONSTANTS } from '../constants';

export const YAxis: React.FC<YAxisProps> = ({
    axisId,
    ticks = CHART_CONSTANTS.DEFAULT_TICKS,
    format,
    showTicks = true,
    showLine = true,
    side = 'left',
    offset = 0,
}) => {
    const { yScales, innerH, innerW, theme } = useChart();

    const scale = useMemo(() => {
        const s = yScales[axisId];
        if (!s) {
            throw new Error(`YAxis: unknown axisId "${axisId}"`);
        }
        return s;
    }, [yScales, axisId]);

    const values = useMemo(() =>
        scale.ticks(ticks),
        [scale, ticks]
    );

    const formatter = useMemo(() =>
        getDefaultYFormatter(format),
        [format]
    );

    const xBase = useMemo(() => (side === 'left' ? -offset : innerW + offset),
        [side, offset, innerW]);

    const tickOffset = useMemo(() => ({
        x1: side === 'left' ? -CHART_CONSTANTS.TICK_LENGTH : 0,
        x2: side === 'left' ? 0 : CHART_CONSTANTS.TICK_LENGTH,
    }), [side]);

    const labelX = useMemo(() =>
        side === 'left' ? -CHART_CONSTANTS.LABEL_OFFSET : CHART_CONSTANTS.LABEL_OFFSET,
        [side]
    );

    const tickData = useMemo(() =>
        values.map((t, i) => ({
            key: `ytick-${axisId}-${i}`,
            value: t,
            y: scale(t),
            label: formatter(t),
        })),
        [values, scale, formatter, axisId]
    );

    return (
        <>
            {showLine && (
                <SvgLine
                    x1={xBase}
                    x2={xBase}
                    y1={0}
                    y2={innerH}
                    stroke={theme.axisColor}
                    strokeWidth={CHART_CONSTANTS.AXIS_STROKE_WIDTH}
                />
            )}
            {tickData.map(({ key, y, label }) => (
                <G key={key} x={xBase} y={y}>
                    {showTicks && (
                        <SvgLine
                            x1={tickOffset.x1}
                            x2={tickOffset.x2}
                            y1={0}
                            y2={0}
                            stroke={theme.axisColor}
                            strokeWidth={CHART_CONSTANTS.AXIS_STROKE_WIDTH}
                        />
                    )}
                    <SvgText
                        x={labelX}
                        fontSize={CHART_CONSTANTS.FONT_SIZE}
                        fill={theme.labelColor}
                        textAnchor={side === 'left' ? 'end' : 'start'}
                        alignmentBaseline="middle"
                    >
                        {label}
                    </SvgText>
                </G>
            ))}
        </>
    );
};

export default YAxis;