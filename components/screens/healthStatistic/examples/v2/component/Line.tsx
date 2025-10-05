/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { Path } from 'react-native-svg';
import * as d3 from 'd3';
import useScales from './hooks/useScales';
import { DataSet, Point } from './types';

export const Line: React.FC<DataSet> = ({
    data, color, strokeWidth = 2, yAxisId,
}) => {
    const { xScale, yScales, theme } = useScales();
    const yScale = yScales[yAxisId ?? Object.keys(yScales)[0]];
    const isTime = xScale instanceof (d3.scaleTime as any)().constructor;

    const dAttr = useMemo(() => {
        const gen = d3.line<Point>()
            .x(p => isTime
                ? (xScale as d3.ScaleTime<number, number>)(p.x as Date)
                : (xScale as d3.ScaleLinear<number, number>)(p.x as number))
            .y(p => yScale(p.y))
        return gen(data) ?? '';
    }, [data, xScale, yScale, isTime]);

    return <Path d={dAttr} fill="none" stroke={color ?? theme.lineColor} strokeWidth={strokeWidth} />;
};