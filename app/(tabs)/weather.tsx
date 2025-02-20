import { CurrentWeatherDataType } from '@/services/weather/types/WeatherDataType';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import WeatherItem from '@/components/weather/WeatherItem';
import { WeatherVariableType } from '@/services/weather/types/MeteoRequestType';
import useAppStore from '@/hooks/useAppStore';
import layout from '../layout/layout.styled';
import UI from '@/components/ui';

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
        <layout.view>
            <UI.Stack direction='row' gap='10px' wrap>
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
            </UI.Stack>
        </layout.view>
    );
};

export default observer(WeatherScreen);
