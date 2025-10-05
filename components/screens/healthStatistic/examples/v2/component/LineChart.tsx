import React, { useMemo } from 'react';
import { Rect } from 'react-native-svg';
import useScales from './hooks/useScales';
import XAxis from './xAxis/XAxis';
import Grid from './grid/Grid';
import { SimpleLineChartProps } from './types';
import {
    extractXValues,
    groupYValuesByAxis,
    calculateYDomains,
    safeExtent1D
} from './utils';
import { CHART_CONSTANTS } from './constants';
import { Lines } from './lines/Lines';
import YAxisList from './yAxis/YAxisList';
import ChartRoot from './ChartRoot';


// Helper overlay to capture gestures later (optional)
export const HitRect: React.FC<{
    onPress?: (x: number, y: number) => void
} & React.ComponentProps<typeof Rect>> = ({ onPress, ...rest }) => {
    const { innerW, innerH } = useScales();
    return <Rect width={innerW} height={innerH} opacity={0} {...rest} />;
};

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
    width,
    height,
    dataSet,
    xKind = 'linear',
    padding
}) => {
    // Calculate X domain
    const xDomain = useMemo(() => {
        const allPoints = dataSet.flatMap(s => s.data);
        const xValues = extractXValues(allPoints, xKind);
        const [xMin, xMax] = safeExtent1D(xValues);

        return xKind === 'time'
            ? [new Date(xMin), new Date(xMax)] as [Date, Date]
            : [xMin, xMax] as [number, number];
    }, [dataSet, xKind]);

    // Calculate Y domains
    const yDomains = useMemo(() => {
        const groups = groupYValuesByAxis(dataSet);
        return calculateYDomains(groups);
    }, [dataSet]);

    const axisIds = useMemo(() => Object.keys(yDomains), [yDomains]);

    // Validate Y domains
    if (Object.keys(yDomains).length === 0) {
        throw new Error('Chart requires at least one Y domain');
    }

    return (
        <ChartRoot
            dimensions={{ width, height, padding }}
            dataDomain={{ x: xDomain }}
            kinds={{ x: xKind }}
            yDomains={yDomains}
        >
            <Grid yTicks={CHART_CONSTANTS.DEFAULT_TICKS} yAxisId={axisIds[0]} />
            <Lines dataSet={dataSet} />
            <XAxis ticks={CHART_CONSTANTS.DEFAULT_TICKS} />
            <YAxisList axisIds={axisIds} />
        </ChartRoot>
    );
};