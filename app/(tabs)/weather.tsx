import { CurrentWeatherDataType } from '@/services/weather/types/WeatherDataType';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import WeatherItem from '@/components/weather/WeatherItem';
import { WeatherVariableType } from '@/services/weather/types/MeteoRequestType';
import useAppStore from '@/hooks/useAppStore';

const WeatherScreen = () => {
    const appStore = useAppStore();

    useEffect(() => {
        appStore.weather.fetch();
    }, [appStore.weather]);

    const currentWeather = appStore.weather?.data?.current;
    const variables = Object.keys(
        currentWeather ?? {},
    ) as WeatherVariableType[];

    return (
        <View className='flex-1 bg-[#25292e] p-3'>
            <View style={{ gap: 8 }}>
                {variables.map((variable) => {
                    const value = currentWeather?.[variable] ?? null;
                    return (
                        <WeatherItem
                            key={variable}
                            variable={variable}
                            value={value as unknown as CurrentWeatherDataType}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default observer(WeatherScreen);
