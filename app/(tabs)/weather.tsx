import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import UI from '@/components/ui';
import CurrentWeatherStatus from '@/components/weather/currentWeatherStatus/CurrentWeatherStatus';
import * as Location from 'expo-location';
import DailyForecast from '@/components/weather/dailyForecast/DailyForecast';

const WeatherScreen = () => {
    const appStore = useAppStore();

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            appStore.weather.weatherData.fetch({ ...location.coords });
        }

        getCurrentLocation();
    }, [appStore.weather]);

    return (
        <UI.Screen>
            <UI.YStack gap='$2.5'>
                <CurrentWeatherStatus />
                <DailyForecast />
            </UI.YStack>
        </UI.Screen>
    );
};

export default observer(WeatherScreen);
