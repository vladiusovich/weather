import { getWeather } from '@/services/weather/openMeteo';
import {
    CurrentWeatherDataType,
    WeatherDataType,
} from '@/services/weather/types/WeatherDataType';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import WeatherItem from '@/components/weather/WeatherItem';
import { WeatherVariableType } from '@/services/weather/types/MeteoRequestType';

const WeatherScreen = () => {
    const [weather, setWeather] = useState<null | WeatherDataType>(null);

    useEffect(() => {
        (async () => {
            const weather = await getWeather({
                latitude: 52.52,
                longitude: 13.41,
                current: [
                    'temperature_2m',
                    'relative_humidity_2m',
                    'apparent_temperature',
                    'weather_code',
                ],
                daily: ['temperature_2m_max'],
                timezone: 'GMT',
            });

            setWeather(weather);
        })();
    }, []);

    const variables = Object.keys(
        weather?.current || {},
    ) as WeatherVariableType[];

    return (
        <View className='flex-1 bg-[#25292e] p-3'>
            <View style={{ gap: 8 }}>
                {variables.map((variable) => {
                    const value = weather?.current?.[variable] ?? null;
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

export default WeatherScreen;
