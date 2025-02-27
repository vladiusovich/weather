import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import ScrollableForecast from '../common/scrollableForecast/ScrollableForecast';
import ForecastItem from '../common/scrollableForecast/ForecastItem';

const HourlyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const isLoading = !appStore.weather.weatherData.data?.hourly;
    const hourly = appStore.weather.weatherData.hourly;

    return (
        <ScrollableForecast
            title={t('meteo.hourly.hourlyForecast.title')}
            isLoading={isLoading}
        >
            {hourly.map((i) => (
                <ForecastItem key={i.time}>
                    <Format.Date variant='time' value={i.time} />
                    <Format.Temp value={i.temperature_2m} />
                    <Format.WmoIcon value={i.weather_code} />
                    <Format.Precipitation
                        value={i.precipitation_probability}
                    />
                    <Format.Humidity
                        value={i.relative_humidity_2m}
                    />
                </ForecastItem>
            ))}
        </ScrollableForecast>
    );
};

export default observer(HourlyForecast);
