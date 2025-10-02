import React from 'react';
import { View } from 'react-native';
import { CartesianChart, StackedArea, useChartPressState } from 'victory-native';
import { DashPathEffect, LinearGradient, vec } from '@shopify/react-native-skia';

const generateData = () =>
    Array.from({ length: 12 }, (_, index) => {
        const low = Math.round(20 + 20 * Math.random());
        const med = Math.round(low - 5 * Math.random());
        const high = Math.round(low + 3 + 20 * Math.random());

        return {
            month: new Date(2020, index).toLocaleString('default', {
                month: 'short',
            }),
            low,
            med,
            high,
        };
    });

const data = generateData();

const StackedAreaExample = () => {
    return (
        <View style={{ height: 300 }}>
            <CartesianChart
                data={data}
                xKey="month"
                yKeys={['low', 'med', 'high']}
                padding={8}
                domain={{ y: [0, 150] }}
                domainPadding={{ top: 0 }}
                xAxis={{
                    labelOffset: 4,
                    lineWidth: 0,
                }}
                yAxis={[
                    {
                        labelOffset: 8,
                        linePathEffect: <DashPathEffect intervals={[4, 4]} />,
                    },
                ]}
                onChartBoundsChange={({ left, right, top, bottom }) => {
                    // setW(right - left);
                    // setH(bottom - top);
                }}
            >
                {({ points, chartBounds }) => (
                    <>
                        <StackedArea
                            points={[points.low, points.med, points.high]}
                            y0={chartBounds.bottom}
                            curveType="natural"
                            animate={{ type: 'spring' }}
                            areaOptions={({ rowIndex, lowestY, highestY }) => {
                                switch (rowIndex) {
                                    case 0:
                                        return {
                                            children: (
                                                <LinearGradient
                                                    start={vec(0, highestY - 25)}
                                                    end={vec(0, lowestY)}
                                                    colors={['#f7ce64', '#f7ce6420']}
                                                />
                                            ),
                                        };
                                    case 1:
                                        return {
                                            children: (
                                                <LinearGradient
                                                    start={vec(0, highestY - 100)}
                                                    end={vec(0, lowestY)}
                                                    colors={['#22dacd', '#22dacd20']}
                                                />
                                            ),
                                        };
                                    case 2:
                                        return {
                                            children: (
                                                <LinearGradient
                                                    start={vec(0, highestY - 100)}
                                                    end={vec(0, lowestY)}
                                                    colors={['#56aefb', '#56aefb20']}
                                                />
                                            ),
                                        };
                                    default:
                                        return {};
                                }
                            }}
                        />
                    </>
                )}
            </CartesianChart>
        </View>
    );
}


export default StackedAreaExample;