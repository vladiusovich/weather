import { Path, useFont } from '@shopify/react-native-skia';
import React from 'react';
import { View } from 'react-native';
import { CartesianChart, PointsArray, useChartTransformState, useLinePath } from 'victory-native';
import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';

function getRandom(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const generateData = (length: number) =>
    Array.from({ length }, (_, index) => {
        const temp = Math.round(getRandom(-10, 15));
        const pressure = Math.round(getRandom(650, 900));

        return {
            month: new Date(2020, index).toLocaleString('default', {
                month: 'short',
            }),
            temp,
            pressure,
            painValue: getRandom(1, 10)
        };
    });


const MetricLine = ({ points, color }: { points: PointsArray, color?: string }) => {
    const { path } = useLinePath(points, { curveType: 'cardinal' });

    return <Path
        path={path}
        style="stroke"
        color={color ?? '#c77415b0'}
        strokeWidth={1}
    />;
}

const PainLine = ({ points }: { points: PointsArray }) => {
    const { path } = useLinePath(points, { curveType: 'cardinal' });
    return <Path
        path={path}
        style="stroke"
        color='#1db2c9cb'
        strokeWidth={4}
    />;
}

const defineDomainScale = (values: number[]): [number, number] => {
    return [
        Math.min(...values),
        Math.max(...values),
    ]
};

const defineViewportScale = (values: number[], padding?: number): [number, number] => {
    return [
        Math.min(...values) - (padding ?? 0),
        Math.max(...values) + (padding ?? 0),
    ]
}

const data = generateData(12);

const BaseExample = () => {
    const font = useFont(SpaceMono, 12);
    // const { state, isActive } = useChartPressState({ x: '', y: defaultState });
    const { state: transformState } = useChartTransformState();

    const tempDomain = defineDomainScale(data.map((d) => d.temp));
    const pressureDomain = defineDomainScale(data.map((d) => d.pressure));
    const painDomain = defineDomainScale(data.map((d) => d.painValue));

    return (
        <View style={{ height: 350 }}>
            <CartesianChart
                data={data}
                xKey="month"
                // yKeys={['low', 'med', 'high', 'painValue']} // specify data keys used for y-axis
                yKeys={['temp', 'pressure', 'painValue']} // specify data keys used for y-axis
                domainPadding={{
                    // top: 10,
                    // bottom: 10,
                    // left: 10,
                    // right: 15,
                }}
                viewport={{
                }}
                xAxis={{
                    labelRotate: 45,
                    // axisSide: 'top',
                    enableRescaling: true,
                    labelColor: '#ff9f0a',
                    lineColor: 'transparent',
                    lineWidth: 1,
                    font,
                }}
                yAxis={[
                    {
                        yKeys: ['temp'],
                        domain: tempDomain,
                        // tickCount: 10
                        // labelPosition: 'outset'
                        // axisSide: 'right',
                        // domain: [-15],
                        labelColor: '#ff9f0a',
                        lineColor: '#cbcbcb0d',
                        lineWidth: 1,
                        font,
                    },
                    {
                        yKeys: ['pressure'],
                        domain: pressureDomain,
                        formatYLabel: (label) => (label.toFixed(0).toString()),
                        // tickCount: 10
                        labelPosition: 'inset',
                        // axisSide: 'right',
                        lineWidth: 1,
                        // labelPosition: 'inset',
                        labelColor: '#6f50b7ff',
                        lineColor: '#cbcbcb0d',
                        font,
                    },
                    {
                        yKeys: ['painValue'],
                        domain: painDomain,
                        formatYLabel: (label) => (label < 0 ? '' : label.toString()),
                        axisSide: 'right',
                        labelColor: '#1db2c9cb',
                        font,
                    },
                ]}

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
            >
                {/* render function exposes various data, such as points. */}
                {({ points, chartBounds }) => (
                    // 👇 and we'll use the Line component to render a line path.
                    <>
                        {/* <PainBars points={points.painValue} /> */}

                        <MetricLine
                            points={points.temp}
                            color='#6f50b7ff'
                        />
                        <MetricLine
                            points={points.pressure}
                            color='#ff9f0a'
                        />
                        <PainLine
                            points={points.painValue}
                        />
                        {/* <Line
                            points={points.temp}
                            color="#cfc01cff"
                            strokeWidth={1}
                            curveType='basis'
                        /> */}
                        {/* <Line points={points.low} color="#0a99ffff" strokeWidth={1} curveType='basis' /> */}
                    </>
                )}
            </CartesianChart>
        </View >
    );
}


export default BaseExample;