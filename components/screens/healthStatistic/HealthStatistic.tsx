import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import Charts, { lineDataItem } from '@/components/charts';
import { RefreshControl, ScrollView, View } from 'react-native';
import useRefreshController from '@/hooks/useRefreshController';

const lineData: lineDataItem[] = [
    { value: 0, dataPointText: '0' },
    { value: 10, dataPointText: '10' },
    { value: 8, dataPointText: '8' },
    { value: 58, dataPointText: '58' },
    { value: 56, dataPointText: '56' },
    { value: 78, dataPointText: '78' },
    { value: 74, dataPointText: '74' },
    { value: 98, dataPointText: '98' },
];

const lineData2: lineDataItem[] = [
    { value: 0, dataPointText: '0' },
    { value: 20, dataPointText: '20' },
    { value: 18, dataPointText: '18' },
    { value: 40, dataPointText: '40' },
    { value: 40, dataPointText: '40' },
    { value: 36, dataPointText: '36' },
    { value: 60, dataPointText: '60' },
    { value: 54, dataPointText: '54' },
    { value: 85, dataPointText: '85' },
];

function generateLineData(
    length: number,
    min: number = 0,
    max: number = 100,
    volatility: number = 10
): lineDataItem[] {
    const result: lineDataItem[] = [];
    let current = Math.floor((min + max) / 2); // стартуем из середины

    for (let i = 0; i < length; i++) {
        // смещение вверх/вниз
        const delta = Math.floor((Math.random() - 0.5) * volatility * 2);

        current = Math.max(min, Math.min(max, current + delta));

        result.push({
            value: current,
            dataPointText: String(current),
        });
    }

    return result;
}

const HealthStatistic = (() => {
    const [w, setW] = useState(0);

    const { refreshing, handleRefresh } = useRefreshController(async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 300);
        });
    });

    if (refreshing) {
        return null;
    }

    return (
        <UI.ScreenWrapper
            Component={ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <UI.Papper
                onLayout={e => setW(e.nativeEvent.layout.width)}
            >
                <Charts.LineChart
                    width={w - 72} // all paddings from parents
                    dataSet={[
                        { data: lineData },
                        { data: lineData2 },
                        { data: generateLineData(23, 0, 123, 123) },
                        { data: generateLineData(22, 0, 12, 12) },
                        // { data: generateLineData(23, 0, 21, 213) },
                        // { data: generateLineData(15, 0, 333, 11) },
                    ]}
                />
            </UI.Papper>
        </UI.ScreenWrapper >
    )
});

export default observer(HealthStatistic);