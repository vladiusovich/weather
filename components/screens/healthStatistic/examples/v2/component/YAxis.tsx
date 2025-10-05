/* eslint-disable max-len */
import React, { useMemo } from 'react';
import useScales from './hooks/useScales';
import { G, Line as SvgLine, Text as SvgText } from 'react-native-svg';
import { AxisProps } from './types';

export const YAxis: React.FC<AxisProps & { axisId: string; side?: 'left' | 'right'; offset?: number }> = ({
    axisId, ticks = 5, format, showTicks = true, showLine = true, side = 'left', offset = 0,
}) => {
    const { yScales, innerH, innerW, theme } = useScales();
    const scale = yScales[axisId];
    if (!scale) throw new Error(`YAxis: unknown axisId "${axisId}"`);
    const values = useMemo(() => scale.ticks(ticks), [scale, ticks]);
    const fmt = useMemo(() => format ?? ((v: number) => Number.isInteger(v) ? String(v) : v.toFixed(2)), [format]);

    const xBase = side === 'left' ? 0 - offset : innerW + offset;

    return <>
        {showLine && <SvgLine x1={xBase} x2={xBase} y1={0} y2={innerH} stroke={theme.axisColor} strokeWidth={1} />}
        {values.map((t, i) => {
            const y = scale(t);
            return (
                <G key={`y-${axisId}-${i}`} x={xBase} y={y}>
                    {showTicks && <SvgLine x1={side === 'left' ? -6 : 0} x2={side === 'left' ? 0 : 6} y1={0} y2={0} stroke={theme.axisColor} strokeWidth={1} />}
                    <SvgText
                        x={side === 'left' ? -8 : 8}
                        fontSize={10} fill={theme.labelColor}
                        textAnchor={side === 'left' ? 'end' : 'start'}
                        alignmentBaseline="middle"
                    >
                        {fmt(t)}
                    </SvgText>
                </G>
            );
        })}
    </>;
};

export default YAxis;
