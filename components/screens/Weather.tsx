import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RefreshControl, ScrollView } from 'react-native';
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import CurrentWeatherStatus from '@/components/weather/currentWeatherStatus/CurrentWeatherStatus';
import * as Location from 'expo-location';
import DailyForecast from '@/components/weather/dailyForecast/DailyForecast';
import HourlyForecast from '@/components/weather/hourlyForecast/HourlyForecast';
import React from 'react';
import { LocationCoords } from '@/services/weather/types/LocationCoords';
import SolarTransition from '@/components/weather/solarTransition/SolarTransition';

const Weather = () => {
    const appStore = useAppStore();
    const [refreshing, setRefreshing] = React.useState(false);
    const [myLocation, setMyLocation] = React.useState<LocationCoords | null>();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        if (myLocation) {
            await appStore.weather.weatherData.fetch(myLocation);
            setRefreshing(false);
        }
    }, [appStore.weather.weatherData, myLocation]);

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setMyLocation(location.coords)
            appStore.weather.weatherData.fetch({ ...location.coords });
        }

        getCurrentLocation();
    }, [appStore.weather]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <UI.ScreenView>
                <UI.YStack gap='$2.5'>
                    <UI.XStack
                        items={'flex-start'}
                        gap={'$2'}
                    >
                        <CurrentWeatherStatus />
                        <SolarTransition />
                    </UI.XStack>
                    <HourlyForecast />
                    <DailyForecast />
                </UI.YStack>
            </UI.ScreenView>
        </ScrollView>
    );
};

export default observer(Weather);
