import React from 'react';
import { View } from 'react-native';
import { SimpleLineChart } from './component/LineChart';

const getRandom = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const days = Array.from({ length: 25 }, (_, i) => new Date(2025, 9, 1 + i)); // октябрь 2025

const high = days.map((x, i) => ({ x, y: getRandom(15, 48) }));  // может уходить в +/-
const low = days.map((x, i) => ({ x, y: getRandom(-15, 5) }));  // может уходить в +/-

const dataH = high.map((d, i) => ({
    x: d.x,
    y: d.y,
}));

const dataL = low.map((d, i) => ({
    x: d.x,
    y: d.y,
}));

const sets = [
    {
        data: dataH,
        yAxisId: 'temp',
        color: '#de6060ff',
    },
    {
        data: dataL,
        yAxisId: 'pressure',
        color: '#3767b5ff',
    }
];

const D3v2 = () => {
    return (
        <View style={{ padding: 0 }}>
            <SimpleLineChart
                width={430}
                height={500}
                dataSet={sets}
            />
        </View>
    );
}

export default D3v2;
