import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RefreshControl, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import CurrentWeatherStatus from '@/components/weather/currentWeatherStatus/CurrentWeatherStatus';
import DailyForecast from '@/components/weather/dailyForecast/DailyForecast';
import HourlyForecast from '@/components/weather/hourlyForecast/HourlyForecast';
import SolarTransition from '@/components/weather/solarTransition/SolarTransition';
import AccessDenied from '../common/accessDenied/AccessDenied';
import { LocationCoords } from '@/types/LocationCoords';

const Weather = observer(() => {
    const appStore = useAppStore();
    const [refreshing, setRefreshing] = useState(false);
    const [status, requestPermission] = Location.useForegroundPermissions();

    const fetchWeather = useCallback(async (location: LocationCoords) => {
        if (location) {
            await appStore.weather.weatherData.fetch(location);
        }
    }, [appStore.weather.weatherData]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchWeather(appStore.weather.weatherSettings.currentLocation!);
        setRefreshing(false);
    }, [fetchWeather, appStore.weather.weatherSettings.currentLocation]);

    useEffect(() => {
        (async () => {
            if (status?.status !== 'granted') {
                await requestPermission();
            }

            const location = await Location.getCurrentPositionAsync();
            const { coords } = location;

            appStore.weather.weatherSettings.saveLocation(coords);
            await fetchWeather(coords);
        })();
    }, [status?.status, requestPermission, appStore.weather.weatherSettings, fetchWeather]);

    if (status === null) return null;

    if (status.status === 'denied') {
        return <AccessDenied type='geolocation' />
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <UI.ScreenView>
                <UI.YStack gap='$2.5'>
                    <UI.XStack items='flex-start' gap='$2'>
                        <CurrentWeatherStatus />
                        <SolarTransition />
                    </UI.XStack>
                    <HourlyForecast />
                    <DailyForecast />
                </UI.YStack>
            </UI.ScreenView>
        </ScrollView>
    );
});

export default Weather;