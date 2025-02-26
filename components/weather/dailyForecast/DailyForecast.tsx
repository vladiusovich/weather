import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';

const DailyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const daily = appStore.weather.weatherData.daily;

    return (
        <UI.Card
            padding='$3'
            height={160}
            backgroundColor={'$background02'}
        >
            <UI.ScrollView horizontal>
                <UI.YStack gap='$-1'>
                    <UI.Typo.H6>
                        {t('meteo.daily.nDayForecast.title')}
                    </UI.Typo.H6>
                    <UI.XStack
                        justify='space-between'
                        verticalAlign='stretch'
                        gap='$2'
                        flex={1}
                    >
                        {daily.map((i) => (
                            <UI.YStack
                                key={i.time}
                                justify='space-around'
                                verticalAlign='center'
                            >
                                <Format.Date value={i.time} asDayOfWeek />
                                <Format.Temp value={i.temperature_2m_max} />
                                <Format.Temp value={i.temperature_2m_min} />
                                <Format.Precipitation
                                    value={i.precipitation_probability_mean}
                                />
                                <Format.WmoCode
                                    fontSize={'$1'}
                                    value={i.weather_code}
                                />
                            </UI.YStack>
                        ))}
                    </UI.XStack>
                </UI.YStack>
            </UI.ScrollView>
        </UI.Card>
    );
};

export default observer(DailyForecast);
