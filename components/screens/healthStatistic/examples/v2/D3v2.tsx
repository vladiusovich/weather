import React from 'react';
import { View } from 'react-native';
import { SimpleLineChart } from './component/LineChart';

const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const generateData = (daysCount: number, startDate: Date, min: number, max: number) =>
    Array.from({ length: daysCount }, (_, i) => ({
        x: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i),
        y: getRandom(min, max),
    }));

const daysCount = 10;
const startDate = new Date(2025, 9, 1);

const dataH = generateData(daysCount, startDate, 15, 100);
const dataL = generateData(daysCount, startDate, -105, 5);
const dataL2 = generateData(daysCount, startDate, -105, 5);

const sets = [
    {
        data: dataH,
        color: '#de6060ff',
    },
    {
        data: dataL,
        color: '#3767b5ff',
    },
    {
        data: dataL2,
        color: '#76b537ff',
    }
];

const D3v2 = () => {
    return (
        <View style={{ padding: 0 }}>
            <SimpleLineChart
                width={420}
                height={500}
                dataSet={sets}
                xKind='time'
            />
        </View>
    );
}

export default D3v2;
