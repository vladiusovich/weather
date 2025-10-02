import React, { memo } from 'react';
import { View, TextStyle } from 'react-native';
import { useTheme } from 'tamagui';
import {
    CartesianChart,
    Line,
    Area,
    Scatter,
} from 'victory-native';
import useCalculateChartSize from '@/hooks/useCalculateChartSize';
import UI from '@/components/ui';

type Point = Record<string, number | string | Date>;
type Series = {
    id?: string;
    color?: string;
    yKey: string;     // ключ поля с Y
};

export interface LineChartProps {
    data?: Point[];
    series?: Series[];
    height?: number;
    showArea?: boolean;
    animate?: boolean;
    thickness?: number;
    isLoading?: boolean;
    xKey: string;
    xLabelStyle?: TextStyle;
    yLabelStyle?: TextStyle;
}

const LineChartComponent: React.FC<LineChartProps> = ({
    data = [],
    series = [],
    height = 300,
    showArea = false,
    animate = true,
    thickness = 2,
    isLoading = false,
    xKey,
}) => {
    const theme = useTheme();
    const { onLayout, chartWidth, isReady } = useCalculateChartSize();

    return (
        <View onLayout={(e) => onLayout(e.nativeEvent.layout)} style={{ minHeight: height }}>
            <UI.Loader isloading={!isReady || isLoading} />
            {isReady && !isLoading && (
                <CartesianChart
                    data={data}
                    xKey={xKey}
                    yKeys={series.map((s) => s.yKey)}
                    axisOptions={{
                        tickCount: 5,
                        lineColor: theme.outlineColor.get(),
                        labelColor: theme.color.get(),
                    }}
                    width={chartWidth}
                    height={height}
                >
                    {({ points }) => (
                        <>
                            {series.map((s) => (
                                <React.Fragment key={s.id ?? s.yKey}>
                                    {showArea && (
                                        <Area
                                            points={points[s.yKey]}
                                            color={s.color ?? theme.accent3.get()}
                                            animate={{ type: 'timing', duration: animate ? 500 : 0 }}
                                        />
                                    )}
                                    <Line
                                        points={points[s.yKey]}
                                        color={s.color ?? theme.accent3.get()}
                                        strokeWidth={thickness}
                                        animate={{ type: 'timing', duration: animate ? 500 : 0 }}
                                    />
                                    <Scatter
                                        points={points[s.yKey]}
                                        color={s.color ?? theme.accent3.get()}
                                        size={4}
                                    />
                                </React.Fragment>
                            ))}
                        </>
                    )}
                </CartesianChart>
            )}
        </View>
    );
};

export const VictoryLineChart = memo(LineChartComponent);
export default VictoryLineChart;
