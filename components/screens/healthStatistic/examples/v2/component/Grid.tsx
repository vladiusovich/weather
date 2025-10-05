import React, { useMemo } from 'react';
import useScales from './hooks/useScales';
import { Line as SvgLine } from 'react-native-svg';
import { GridProps } from './types';

export const Grid: React.FC<GridProps & { yAxisId?: string }> = ({ yTicks = 5, yAxisId }) => {
    const { yScales, innerW, theme } = useScales();
    const scale = yScales[yAxisId ?? Object.keys(yScales)[0]];
    const values = useMemo(() => scale.ticks(yTicks), [scale, yTicks]);
    return <>
        {values.map((t, i) => (
            <SvgLine key={`g-${i}`} x1={0} x2={innerW} y1={scale(t)} y2={scale(t)} stroke={theme.gridColor} strokeWidth={1} />
        ))}
    </>;
};

export default Grid;
