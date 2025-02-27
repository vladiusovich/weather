import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import ScrollableForecast from '../common/scrollableForecast/ScrollableForecast';
import ForecastItem from '../common/scrollableForecast/ForecastItem';
import {
    Clock3,
} from '@tamagui/lucide-icons'
import { getNow, isSameHour, toDate } from '@/utils/datetime.helper';


const HourlyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const isLoading = !appStore.weather.weatherData.data?.hourly;
    const hourly = appStore.weather.weatherData.hourly;

    const now = getNow();
    return (
        <ScrollableForecast
            header={t('meteo.hourly.hourlyForecast.title')}
            headerIcon={<Clock3 size={20} />}
            isLoading={isLoading}
        >
            {hourly.map((i) => {
                const datetime = toDate(i.time);
                const isCurrent = isSameHour(now, datetime);
                return (
                    <ForecastItem key={i.time} current={isCurrent}>
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
                );
            })}
        </ScrollableForecast>
    );
};

export default observer(HourlyForecast);
