import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';

const DailyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const isLoading = !appStore.weather.weatherData.data?.daily;
    const daily = appStore.weather.weatherData.daily;

    return (
        <UI.Card
            padding='$3'
            height={250}
            backgroundColor={'$background02'}
        >
            {isLoading && (<UI.Loader />)}
            {!isLoading && (
                <UI.ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <UI.YStack gap='$2'>
                        <UI.Typo.H6>
                            {t('meteo.daily.nDayForecast.title')}
                        </UI.Typo.H6>
                        <UI.XStack
                            verticalAlign='stretch'
                            justify='space-between'
                            gap='$4'
                            flex={1}
                        >
                            {daily.map((i) => (
                                <UI.Card
                                    key={i.time}
                                    flex={1}
                                    backgroundColor={'$white12'}
                                    padded
                                    borderRadius={50}
                                >
                                    <UI.YStack
                                        justify='space-around'
                                        items='center'
                                        flex={1}
                                    >
                                        <Format.Date value={i.time} asDayOfWeek />
                                        <Format.Temp value={i.temperature_2m_max} />
                                        <Format.WmoCode
                                            value={i.weather_code}
                                        />
                                        <Format.Temp value={i.temperature_2m_min} />
                                        <Format.Precipitation
                                            value={i.precipitation_probability_mean}
                                        />
                                    </UI.YStack>
                                </UI.Card>
                            ))}
                        </UI.XStack>
                    </UI.YStack>
                </UI.ScrollView>
            )}
        </UI.Card>
    );
};

export default observer(DailyForecast);
