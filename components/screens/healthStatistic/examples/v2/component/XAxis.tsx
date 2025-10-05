/* eslint-disable max-len */
import React, { useMemo } from 'react';
import useScales from './hooks/useScales';
import { G, Line as SvgLine, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3';
import { AxisProps } from './types';

const XAxis: React.FC<AxisProps> = ({
    ticks = 5,
    format,
    showTicks = true,
    showLine = true,
}) => {
    const { xScale, innerH, theme } = useScales();
    // eslint-disable-next-line max-len
    const isTime = 'ticks' in xScale && (xScale as any).ticks.name?.includes('time') || xScale instanceof (d3.scaleTime as any)().constructor;
    const values = useMemo(() => (xScale as any).ticks ? (xScale as any).ticks(ticks) : [], [xScale, ticks]);
    const fmt = useMemo(() => {
        if (format) return format;
        if (isTime) return d3.timeFormat('%d.%m');
        return (v: number) => String(v);
    }, [format, isTime]);

    return (
        <>
            {showLine && <SvgLine x1={0} x2={(xScale.range() as [number, number])[1]} y1={innerH} y2={innerH} stroke={theme.axisColor} strokeWidth={1} />}
            {values.map((t: any, i: number) => {
                const x = (xScale as any)(t) as number;
                return (
                    <G key={`xt-${i}`} x={x} y={innerH}>
                        {showTicks && <SvgLine x1={0} x2={0} y1={0} y2={6} stroke={theme.axisColor} strokeWidth={1} />}
                        <SvgText y={16} fontSize={10} fill={theme.labelColor} textAnchor="middle">
                            {fmt(t)}
                        </SvgText>
                    </G>
                );
            })}
        </>
    );
};

export default XAxis;
