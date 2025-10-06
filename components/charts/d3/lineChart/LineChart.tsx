import React, { useMemo } from "react";
import XAxis from "./xAxis/XAxis";
import Grid from "./grid/Grid";
import { SimpleLineChartProps } from "./types";
import {
    extractXValues,
    groupYValuesByAxis,
    calculateYDomains,
    safeExtent1D
} from "./utils";
import { CHART_CONSTANTS } from "./constants";
import { Lines } from "./lines/Lines";
import YAxisList from "./yAxis/YAxisList";
import ChartRoot from "./ChartRoot";

const LineChart: React.FC<SimpleLineChartProps> = ({
    width,
    height,
    dataSet,
    xKind = "linear",
    padding,
    zoomPanConfig,
    enableGestures,
}) => {
    // Calculate X domain
    const xDomain = useMemo(() => {
        const allPoints = dataSet.flatMap(s => s.data);
        const xValues = extractXValues(allPoints, xKind);
        const [xMin, xMax] = safeExtent1D(xValues);

        return xKind === "time"
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
        throw new Error("Chart requires at least one Y domain");
    }

    return (
        <ChartRoot
            dimensions={{ width, height, padding }}
            dataDomain={{ x: xDomain }}
            kinds={{ x: xKind }}
            yDomains={yDomains}
            enableGestures={enableGestures}
            zoomPanConfig={zoomPanConfig}
        >
            <Grid yTicks={CHART_CONSTANTS.DEFAULT_TICKS} yAxisId={axisIds[0]} />
            <Lines dataSet={dataSet} />
            <XAxis ticks={CHART_CONSTANTS.DEFAULT_TICKS} />
            <YAxisList axisIds={axisIds} />
        </ChartRoot>
    );
};

export default LineChart;