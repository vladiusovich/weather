import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import ScrollableForecast from '../common/scrollableForecast/ScrollableForecast';
import ForecastItem from '../common/scrollableForecast/ForecastItem';

const DailyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const isLoading = !appStore.weather.weatherData.data?.daily;
    const daily = appStore.weather.weatherData.daily;

    return (
        <ScrollableForecast
            title={t('meteo.daily.nDayForecast.title')}
            isLoading={isLoading}
        >
            {daily.map((i) => (
                <ForecastItem key={i.time}>
                    <Format.Date variant='dayOfWeek' value={i.time} asDayOfWeek />
                    <Format.Temp value={i.temperature_2m_max} />
                    <Format.WmoIcon value={i.weather_code} />
                    <Format.Temp value={i.temperature_2m_min} />
                    <Format.Precipitation
                        value={i.precipitation_probability_mean}
                    />
                </ForecastItem>
            ))}
        </ScrollableForecast>
    );
};

export default observer(DailyForecast);
