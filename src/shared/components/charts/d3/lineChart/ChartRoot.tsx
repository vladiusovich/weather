import React, { useMemo } from "react";
import { View } from "react-native";
import Svg, { G } from "react-native-svg";
import { ChartContext } from "./context/useChart";
import { ChartProps, Padding } from "./types";
import {
    calculateOffsets,
    calculateYAxisOffsets,
    createXScale,
    createYScales
} from "./utils";
import { DEFAULT_PADDING, DEFAULT_THEME } from "./constants";
import useCalculateChartSize from "./hooks/useCalculateChartSize";
import { useChartTransform } from "./hooks/useChartTransform";
import { GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useChartGestures } from "./hooks/useChartGestures";

export const ChartRoot: React.FC<ChartProps> = ({
    dimensions,
    dataDomain,
    kinds = { x: "linear" },
    yDomains,
    niceY = true,
    theme,
    zoomPanConfig,
    enableGestures,
    children,
}) => {
    const { onLayout, chartWidth } = useCalculateChartSize();
    const {
        state: zoomPanState,
        actions: zoomPanActions,
        setState: setZoomPanState,
        config
    } = useChartTransform(zoomPanConfig);

    const { width, height } = dimensions;
    const currentWidth = width ?? chartWidth;

    const padding: Padding = useMemo(() => ({ ...DEFAULT_PADDING, ...dimensions.padding }),
        [dimensions.padding]
    );

    const yAxisOffsets = useMemo(() => calculateYAxisOffsets(Object.keys(yDomains).length),
        [yDomains]
    );

    const offsetsWidth = useMemo(() => calculateOffsets(yAxisOffsets),
        [yAxisOffsets]
    );

    const innerDimensions = useMemo(() => ({
        innerW: currentWidth - padding.left - padding.right,
        innerH: height - padding.top - padding.bottom,
    }), [currentWidth, height, padding]);

    // Initialize gestures using react-native-gesture-handler
    const gesture = useChartGestures({
        zoomPanState,
        setZoomPanState,
        minScale: config.minScale,
        maxScale: config.maxScale,
        enabled: enableGestures,
    });

    // Apply zoom and pan transformations to X domain
    const transformedXDomain = useMemo(() => {
        const [min, max] = dataDomain.x;
        const minNum = kinds.x === "time" ? +min : (min as number);
        const maxNum = kinds.x === "time" ? +max : (max as number);

        const range = maxNum - minNum;
        const scaledRange = range / zoomPanState.scale;
        const center = minNum + range / 2;

        // Apply pan (translateX affects the center position)
        const panOffset = (zoomPanState.translateX / innerDimensions.innerW) * range;
        const adjustedCenter = center - panOffset;

        const newMin = adjustedCenter - scaledRange / 2;
        const newMax = adjustedCenter + scaledRange / 2;

        return kinds.x === "time"
            ? [new Date(newMin), new Date(newMax)] as [Date, Date]
            : [newMin, newMax] as [number, number];
    }, [dataDomain.x, zoomPanState.scale, zoomPanState.translateX, kinds.x, innerDimensions.innerW]);

    // Apply zoom and pan transformations to Y domains
    const transformedYDomains = useMemo(() => {
        const transformed: Record<string, [number, number]> = {};

        Object.entries(yDomains).forEach(([id, [min, max]]) => {
            const range = max - min;
            const scaledRange = range / zoomPanState.scale;
            const center = min + range / 2;

            // Apply pan (translateY affects the center position)
            const panOffset = (zoomPanState.translateY / innerDimensions.innerH) * range;
            const adjustedCenter = center + panOffset; // Y axis is inverted

            const newMin = adjustedCenter - scaledRange / 2;
            const newMax = adjustedCenter + scaledRange / 2;

            transformed[id] = [newMin, newMax];
        });

        return transformed;
    }, [yDomains, zoomPanState.scale, zoomPanState.translateY, innerDimensions.innerH]);

    const xScale = useMemo(() => createXScale(kinds.x, transformedXDomain, innerDimensions.innerW),
        [kinds.x, transformedXDomain, innerDimensions.innerW]
    );

    const yScales = useMemo(() => createYScales(transformedYDomains, innerDimensions.innerH, niceY),
        [transformedYDomains, innerDimensions.innerH, niceY]
    );

    const themeFinal = useMemo(() => ({ ...DEFAULT_THEME, ...theme }),
        [theme]
    );

    const contextValue = useMemo(() => ({
        xScale,
        yScales,
        yAxisOffsets,
        innerW: innerDimensions.innerW,
        innerH: innerDimensions.innerH,
        padding,
        theme: themeFinal,
        zoomPanState,
        zoomPanActions,
    }), [xScale, yScales, yAxisOffsets, innerDimensions, padding, themeFinal, zoomPanState, zoomPanActions]);

    const paddingLeft = yAxisOffsets.length <= 1
        ? padding.left
        : offsetsWidth;

    const chartContent = (
        <Svg width={currentWidth} height={height}>
            <G x={paddingLeft} y={padding.top}>
                <ChartContext.Provider value={contextValue}>
                    {children}
                </ChartContext.Provider>
            </G>
        </Svg>
    );

    return (
        <GestureHandlerRootView style={{ minHeight: height }}>
            <View
                onLayout={e => onLayout(e.nativeEvent.layout)}
                style={{ minHeight: height, position: "relative" }}
            >
                {enableGestures
                    ? (
                        <GestureDetector gesture={gesture}>
                            {chartContent}
                        </GestureDetector>
                    )
                    : chartContent
                }
            </View>
        </GestureHandlerRootView>
    );
};


export default ChartRoot;