import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import ScrollableForecast from '../common/scrollableForecast/ScrollableForecast';
import ForecastItem from '../common/scrollableForecast/ForecastItem';
import { Calendar } from '@tamagui/lucide-icons';
import { isSameDay, getNow, toDate } from '@/utils/datetime.helper';

const DailyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const isLoading = !appStore.weather.weatherData.data?.daily;
    const daily = appStore.weather.weatherData.daily;

    const now = getNow();
    return (
        <ScrollableForecast
            header={t('meteo.daily.nDayForecast.title')}
            headerIcon={<Calendar size={20} />}
            isLoading={isLoading}
        >
            {daily.map((i) => {
                const datetime = toDate(i.time);
                const isCurrent = isSameDay(now, datetime);
                return (
                    <ForecastItem key={i.time} current={isCurrent}>
                        <Format.Date variant='dayOfWeek' value={i.time} asDayOfWeek />
                        <Format.Temp value={i.temperature2mMax} />
                        <Format.WmoIcon value={i.weatherCode} />
                        <Format.Temp value={i.temperature2mMin} />
                        <Format.Precipitation
                            value={i.precipitationProbabilityMean}
                        />
                    </ForecastItem>
                );
            })}
        </ScrollableForecast>
    );
};

export default observer(DailyForecast);
