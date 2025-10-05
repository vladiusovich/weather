import React from 'react';
import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import Charts, { lineDataItem } from '@/components/charts';
import { RefreshControl, ScrollView } from 'react-native';
import useRefreshController from '@/hooks/useRefreshController';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import { range } from '@/utils/array.helper';
import { delay } from '@/utils/promise.helper';
import D3Chart from './examples/v1/D3Chart';
import D3v2 from './examples/v2/D3v2';

const getRandom = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

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

    const precipitations: lineDataItem[] = daily.map((d) => {
        return {
            value: d.precipitationProbabilityMean,
            // labelComponent: () => <Format.Date fontSize={'$1'} variant='shortDate' value={d.time} />,
        };
    });

    const pain = daily.map((p) => {
        return {
            value: getRandom(1, 10),
        };
    })
    return (
        <UI.ScreenWrapper
            Component={ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <UI.Papper>
                <D3v2 />
            </UI.Papper>
        </UI.ScreenWrapper >
    )
});

export default observer(HealthStatistic);