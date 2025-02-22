import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import layout from '../layout/layout.styled';
import UI from '@/components/ui';
import CurrentWeatherStatus from '@/components/weather/currentWeatherStatus/CurrentWeatherStatus';
import * as Location from 'expo-location';

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
        <layout.view>
            <UI.Stack direction='row' gap='10px' wrap>
                <CurrentWeatherStatus />
            </UI.Stack>
        </layout.view>
    );
};

export default observer(WeatherScreen);
