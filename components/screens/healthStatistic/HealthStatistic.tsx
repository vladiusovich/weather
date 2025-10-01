import React from 'react';
import { observer } from 'mobx-react-lite';
import UI from '@/components/ui';
import Charts, { lineDataItem } from '@/components/charts';
import { RefreshControl, ScrollView } from 'react-native';
import useRefreshController from '@/hooks/useRefreshController';
import useAppStore from '@/hooks/useAppStore';

const HealthStatistic = (() => {
    const appStore = useAppStore();

    const { refreshing, handleRefresh } = useRefreshController(async () => {
        return new Promise((resolve) => setTimeout(() => resolve(), 300));
    });

    if (refreshing) {
        return null;
    }

    const daily = appStore.weather.weatherData.daily;

    const dailyDataSet: lineDataItem[] = daily.map((d) => {
        return {
            value: d.temperature2mMax,
            label: d.temperature2mMax.toString(),
        };
    });
    return (
        <UI.ScreenWrapper
            Component={ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <UI.YStack gap={15}>
                <UI.Papper>
                    <Charts.LineChart
                        dataSet={[
                            { data: dailyDataSet },
                        ]}
                    />
                </UI.Papper>
            </UI.YStack>
        </UI.ScreenWrapper >
    )
});

export default observer(HealthStatistic);