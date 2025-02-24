import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import { View } from 'tamagui';

interface Props { }

const DailyForecast: React.FC<Props> = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const daily = appStore.weather.weatherData.daily;

    return (
        <View
            style={{
                width: '100%',
                height: '220px',
                backgroundColor: 'red',
            }}>
            <UI.ScrollView horizontal>
                <UI.YStack gap='$-1'>
                    <UI.Typo.H3>
                        {t('meteo.daily.nDayForecast.title')}
                    </UI.Typo.H3>
                    <UI.XStack
                        justify='space-around'
                        verticalAlign='stretch'
                        gap='$-10'>
                        {daily.map((i) => (
                            <UI.YStack
                                key={i.time}
                                justify='space-around'
                                verticalAlign='center'>
                                <Format.Date value={i.time} asDayOfWeek />
                                <Format.Temp value={i.temperature_2m_max} />
                                <Format.Temp value={i.temperature_2m_min} />
                                <Format.Precipitation
                                    value={i.precipitation_probability_mean}
                                />
                                <Format.WmoCode value={i.weather_code} />
                            </UI.YStack>
                        ))}
                    </UI.XStack>
                </UI.YStack>
            </UI.ScrollView>
        </View>
    );
};

export default observer(DailyForecast);
