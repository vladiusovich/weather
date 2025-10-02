import { Circle, useFont } from '@shopify/react-native-skia';
import React from 'react';
import { View } from 'react-native';
import { CartesianChart, Line, useChartPressState, useChartTransformState } from 'victory-native';
import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';
import { SharedValue } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import UI from '@/components/ui';

function getRandom(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const generateData = (length: number) =>
    Array.from({ length }, (_, index) => {
        const low = Math.round(-5 + getRandom(-5, 0));
        const med = Math.round(low + getRandom(10, 15));
        const high = Math.round(med + getRandom(5, 10));

        return {
            month: index,
            low,
            med,
            high,
            painValue: getRandom(1, 10)
        };
    });

const data = generateData(30);

const defaultState = {
    low: 0,
    med: 0,
    high: 0,
};

type TooltipPositionType = { x: SharedValue<number>; y: SharedValue<number> };

const ToolTip = ({ position, color }: { position: TooltipPositionType; color: string }) => {
    return <Circle cx={position.x} cy={position.y} r={4} color={color} />;
}

const SplitChartsExample = () => {
    const font = useFont(SpaceMono, 12);
    const { state, isActive } = useChartPressState({ x: '', y: defaultState });
    const { state: transformState } = useChartTransformState();

    return (
        <UI.YStack gap={15}>
            <UI.Papper style={{ height: 400 }}>
                <CartesianChart
                    data={data}
                    xKey="month"
                    yKeys={['low', 'med', 'high']} // specify data keys used for y-axis
                    // yKeys={['med']} // specify data keys used for y-axis
                    yAxis={[
                        {
                            font,
                            yKeys: ['low', 'med', 'high'],
                            labelColor: '#ff9f0a',
                            lineColor: '#cbcbcb32',
                            lineWidth: 1,
                            // labelPosition: 'outset'
                            // axisSide: 'right',
                            // domain: [-15]
                        },
                    ]}
                    transformState={transformState} // enable pan/zoom
                    transformConfig={{
                        pan: {
                            // enabled: false, // Enable/disable panning gesture (defaults to true)
                            // dimensions: 'x', // "x" | "y" | ("x" | "y")[]; Control which dimensions can be panned
                            // activateAfterLongPress: 100, // Minimum time to press before pan gesture is activated
                        },
                        pinch: {
                            // enabled: false, // Enable/disable pinch gesture (defaults to true)
                            // dimensions: 'x', // "x" | "y" | ("x" | "y")[]; // Control which dimensions can be zoomed
                        }
                    }}
                // viewport={{ x: [0, 20] }}
                >
                    {({ points }) => (
                        <>
                            <Line points={points.high} color="#ff600aff" strokeWidth={1} curveType='basis' />
                            <Line points={points.med} color="#cfc01cff" strokeWidth={1} curveType='basis' />
                            <Line points={points.low} color="#0a99ffff" strokeWidth={1} curveType='basis' />
                        </>
                    )}
                </CartesianChart>
            </UI.Papper >
            <UI.Papper style={{ height: 200 }}>
                <CartesianChart
                    data={data}
                    xKey="month"
                    // yKeys={['low', 'med', 'high', 'painValue']} // specify data keys used for y-axis
                    yKeys={['painValue']} // specify data keys used for y-axis
                    xAxis={{
                        font,
                        labelColor: '#ff9f0a',
                        lineColor: '#cbcbcb32',
                        lineWidth: 0,
                        // labelPosition: 'outset'
                        // axisSide: 'top',
                        enableRescaling: true,
                    }}
                    yAxis={[
                        {
                            font,
                            yKeys: ['painValue'],
                            labelColor: '#ff9f0a',
                            lineColor: '#cbcbcb32',
                            lineWidth: 1,
                            domain: [0, 10],
                            // labelPosition: 'outset'
                            // axisSide: 'right',
                            // domain: [-15]
                        },
                    ]}
                    frame={{
                        // lineColor: 'red'
                    }}
                    // chartPressState={state}
                    chartPressConfig={{
                        pan: {
                            // activateAfterLongPress: 1000,
                            // activeOffsetX: 10,
                            // activeOffsetY: 10,
                        },
                    }}
                    transformState={transformState} // enable pan/zoom
                    transformConfig={{
                        pan: {
                            // enabled: false, // Enable/disable panning gesture (defaults to true)
                            // dimensions: 'x', // "x" | "y" | ("x" | "y")[]; Control which dimensions can be panned
                            // activateAfterLongPress: 100, // Minimum time to press before pan gesture is activated
                        },
                        pinch: {
                            // enabled: false, // Enable/disable pinch gesture (defaults to true)
                            // dimensions: 'x', // "x" | "y" | ("x" | "y")[]; // Control which dimensions can be zoomed
                        }
                    }}
                // viewport={{ x: [0, 20] }}
                >
                    {/* render function exposes various data, such as points. */}
                    {({ points }) => (
                        // 👇 and we'll use the Line component to render a line path.
                        <>
                            <Line points={points.painValue} color="#7715c7ff" strokeWidth={4} curveType='basis' />
                        </>
                    )}
                </CartesianChart>
            </UI.Papper >
        </UI.YStack>
    );
}


export default SplitChartsExample;