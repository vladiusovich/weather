import React, { memo } from 'react';
import { LineChart as NativeLineChart } from 'react-native-gifted-charts';
import { useTheme, View } from 'tamagui';
import { type TextStyle } from 'react-native';
import { DataSet, RuleType } from 'gifted-charts-core';
import useCalculateChartSize from '@/hooks/useCalculateChartSize';
import UI from '@/components/ui';

export { lineDataItem, DataSet } from 'react-native-gifted-charts';

export interface LineChartProps {
    dataSet?: DataSet[];
    height?: number;
    rulesType?: RuleType;
    showArea?: boolean;
    animate?: boolean;
    xLabelStyle?: TextStyle;
    yLabelStyle?: TextStyle;
    thickness?: number
    isLoading?: boolean;
}

const AppLineChartComponent: React.FC<LineChartProps> = ({
    dataSet,
    isLoading = false,
    height = 350,
    showArea = false,
    animate = true,
    rulesType = 'dashed',
    xLabelStyle,
    yLabelStyle,
    ...props
}) => {
    const theme = useTheme();
    const { onLayout, chartWidth, isReady } = useCalculateChartSize();

    const line = theme.accent3.get();
    const axis = theme.outlineColor.get();
    const text = theme.color.get();
    const rulesColor = theme.outlineColor.get();

    return (
        <View
            onLayout={e => onLayout(e.nativeEvent.layout)}
            minH={height}
        >
            <UI.Loader isloading={!isReady || isLoading} />
            {(isReady && !isLoading) && (
                <NativeLineChart
                    dataSet={dataSet}
                    height={height}
                    thickness={0.5}
                    curved
                    color={line}
                    areaChart={showArea}
                    startOpacity={0.5}
                    endOpacity={0}
                    dataPointsColor={line}
                    dataPointsRadius={3}
                    endSpacing={0}
                    width={chartWidth}
                    isAnimated={animate}
                    animateOnDataChange={animate}
                    // axis and grid
                    hideRules={false}
                    rulesType={rulesType}
                    rulesColor={rulesColor}
                    yAxisColor={axis}
                    xAxisColor={axis}
                    xAxisLabelTextStyle={[{ color: text, fontSize: 11 }, xLabelStyle]}
                    yAxisTextStyle={[{ color: text, fontSize: 11 }, yLabelStyle]}
                    {...props}
                />
            )}
        </View>
    );
};

export const LineChart = memo(AppLineChartComponent);

export default LineChart;
