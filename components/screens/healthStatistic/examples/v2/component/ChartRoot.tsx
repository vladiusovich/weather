import React, { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { G } from 'react-native-svg';
import { ChartContext } from './context/useChart';
import { ChartProps, Padding } from './types';
import {
    calculateOffsets,
    calculateYAxisOffsets,
    createXScale,
    createYScales
} from './utils';
import { DEFAULT_PADDING, DEFAULT_THEME } from './constants';
import useCalculateChartSize from './hooks/useCalculateChartSize';

export const ChartRoot: React.FC<ChartProps> = ({
    dimensions,
    dataDomain,
    kinds = { x: 'linear' },
    yDomains,
    niceY = true,
    theme,
    children,
}) => {
    const { onLayout, chartWidth } = useCalculateChartSize();
    const { width, height } = dimensions;

    const currentWidth = width ?? chartWidth
    const padding: Padding = useMemo(() => ({ ...DEFAULT_PADDING, ...dimensions.padding }),
        [dimensions.padding]
    );

    const yAxisOffsets = calculateYAxisOffsets(Object.keys(yDomains).length);
    const offsetsWidth = calculateOffsets(yAxisOffsets);

    const innerDimensions = useMemo(() => ({
        innerW: currentWidth - padding.left - padding.right,
        innerH: height - padding.top - padding.bottom,
    }), [currentWidth, height, padding.bottom, padding.left, padding.right, padding.top]);

    const xScale = useMemo(() => createXScale(kinds.x, dataDomain.x, innerDimensions.innerW),
        [kinds.x, dataDomain.x, innerDimensions.innerW]
    );

    const yScales = useMemo(() => createYScales(yDomains, innerDimensions.innerH, niceY),
        [yDomains, innerDimensions.innerH, niceY]
    );

    const themeFinal = useMemo(() => ({ ...DEFAULT_THEME, ...theme }), [theme]);

    const contextValue = useMemo(() => ({
        xScale,
        yScales,
        yAxisOffsets,
        innerW: innerDimensions.innerW,
        innerH: innerDimensions.innerH,
        padding,
        theme: themeFinal,
    }), [xScale, yScales, yAxisOffsets, innerDimensions.innerW, innerDimensions.innerH, padding, themeFinal]);

    const paddingLeft = yAxisOffsets.length <= 1
        ? padding.left
        : offsetsWidth;

    return (
        <View
            onLayout={e => onLayout(e.nativeEvent.layout)}
            style={{ minHeight: height }}
        >
            <Svg width={currentWidth} height={height}>
                <G x={paddingLeft} y={padding.top}>
                    <ChartContext.Provider value={contextValue}>
                        {children}
                    </ChartContext.Provider>
                </G>
            </Svg>
        </View>
    );
};

export default ChartRoot;