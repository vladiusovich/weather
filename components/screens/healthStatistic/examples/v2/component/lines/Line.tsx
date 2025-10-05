import React, { useMemo } from 'react';
import { Path } from 'react-native-svg';
import * as d3 from 'd3';
import { DataSet } from './../types';
import { CHART_CONSTANTS } from '../constants';
import useChart from '../context/useChart';
import { Point } from '../types';
import { isTimeScale } from '../utils';

export const Line: React.FC<DataSet> = ({
    data,
    color,
    strokeWidth = CHART_CONSTANTS.DEFAULT_STROKE_WIDTH,
    yAxisId,
}) => {
    const { xScale, yScales, theme } = useChart();

    const yScale = useMemo(() => {
        const id = yAxisId ?? Object.keys(yScales)[0];
        return yScales[id];
    }, [yScales, yAxisId]);

    const isTime = useMemo(() => isTimeScale(xScale), [xScale]);

    const dAttr = useMemo(() => {
        const lineGenerator = d3.line<Point>()
            .x(p => {
                if (isTime) {
                    return (xScale as d3.ScaleTime<number, number>)(p.x as Date);
                }
                return (xScale as d3.ScaleLinear<number, number>)(p.x as number);
            })
            .y(p => yScale(p.y));

        return lineGenerator(data) ?? '';
    }, [data, xScale, yScale, isTime]);

    const strokeColor = useMemo(() =>
        color ?? theme.lineColor,
    [color, theme.lineColor]
    );

    return (
        <Path
            d={dAttr}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
        />
    );
};