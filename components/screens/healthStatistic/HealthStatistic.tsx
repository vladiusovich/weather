import React from 'react';
import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import Charts, { lineDataItem } from '@/components/charts';
import { RefreshControl, ScrollView } from 'react-native';
import useRefreshController from '@/hooks/useRefreshController';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import { delay } from '@/utils/promise.helper';
import StackedAreaExample from './victoryCharts/StackedArea';
import BaseExample from './victoryCharts/BaseExample';
import SplitChartsExample from './victoryCharts/SplitChartsExample';


const HealthStatistic = (() => {
    const appStore = useAppStore();

    const { refreshing, handleRefresh } = useRefreshController(async () => delay(300));

    if (refreshing) {
        return null;
    }

    const daily = appStore.weather.weatherData.daily;

    const tempDataSet: lineDataItem[] = daily.map((d) => {
        return {
            value: d.temperature2mMax,
            labelComponent: () => <Format.Date fontSize={'$1'} variant='shortDate' value={d.time} />,
        };
    });

    const data = [
        { day: 'Mon', temp: 20, humidity: 5 },
        { day: 'Tue', temp: 22, humidity: 6 },
        { day: 'Wed', temp: 18, humidity: 4 },
        { day: 'Wed', temp: 18, humidity: 4 },
        { day: 'Wed', temp: 18, humidity: 4 },
        { day: 'Wed', temp: 18, humidity: 4 },
    ];

    return (
        <UI.ScreenWrapper
            Component={ScrollView}
        // showsVerticalScrollIndicator={false}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            {/* <BaseExample /> */}
            <SplitChartsExample />
            {/* <UI.Separator /> */}
            {/* <UI.Papper>
                <StackedAreaExample />
            </UI.Papper>
            <UI.Separator />
            <UI.Papper>
                <Charts.VictoryLineChart
                    data={data}
                    xKey="day"
                    series={[
                        { yKey: 'temp', color: '#5ac8fa' },
                        { yKey: 'humidity', color: '#ff9f0a' },
                    ]}
                    showArea
                />

            </UI.Papper> */}
        </UI.ScreenWrapper >
    )
});

export default observer(HealthStatistic);