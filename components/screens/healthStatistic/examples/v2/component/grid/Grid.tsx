import React, { useMemo } from 'react';
import useChart from '../context/useChart';
import { Line as SvgLine } from 'react-native-svg';
import { GridProps } from '../types';
import { CHART_CONSTANTS } from '../constants';

export const Grid: React.FC<GridProps> = ({
    yTicks = CHART_CONSTANTS.DEFAULT_TICKS,
    yAxisId
}) => {
    const { yScales, innerW, theme } = useChart();

    const scale = useMemo(() => {
        const id = yAxisId ?? Object.keys(yScales)[0];
        return yScales[id];
    }, [yScales, yAxisId]);

    const values = useMemo(() => scale.ticks(yTicks), [scale, yTicks]);

    const gridLines = useMemo(() => values.map((t, i) => ({
        key: `grid-${i}`,
        y: scale(t)
    })), [values, scale]);

    return (
        <>
            {gridLines.map(({ key, y }) => (
                <SvgLine
                    key={key}
                    x1={0}
                    x2={innerW}
                    y1={y}
                    y2={y}
                    stroke={theme.gridColor}
                    strokeWidth={CHART_CONSTANTS.GRID_STROKE_WIDTH}
                />
            ))}
        </>
    );
};

export default Grid;