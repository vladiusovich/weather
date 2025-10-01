import React, { memo } from 'react';
import { LineChart as NativeLineChart } from 'react-native-gifted-charts';
import { getTokens, useTheme } from 'tamagui';
import { type TextStyle } from 'react-native';
import { DataSet, RuleType } from 'gifted-charts-core';

export { lineDataItem, DataSet } from 'react-native-gifted-charts';

export interface LineChartProps {
    dataSet?: DataSet[];
    height?: number;
    width?: number;
    rulesType?: RuleType;
    showArea?: boolean;
    animate?: boolean;
    xLabelStyle?: TextStyle;
    yLabelStyle?: TextStyle;
    thickness?: number
}

const AppLineChartComponent: React.FC<LineChartProps> = ({
    dataSet,
    height = 350,
    showArea = false,
    animate = true,
    rulesType = 'dashed',
    xLabelStyle,
    yLabelStyle,
    ...props
}) => {
    const theme = useTheme();
    const tokens = getTokens();

    const line = theme.accent3.get();
    const axis = theme.outlineColor.get();
    const text = theme.color.get();
    const rulesColor = theme.outlineColor.get();
    // const backgroundColor = theme.background02.get();

    return (
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
            // adjustToWidth
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
            // backgroundColor={backgroundColor}
            {...props}
        />
    );
};

export const LineChart = memo(AppLineChartComponent);

export default LineChart;
