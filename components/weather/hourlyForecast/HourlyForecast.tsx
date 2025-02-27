import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';

const HourlyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const isLoading = !appStore.weather.weatherData.data?.hourly;
    const hourly = appStore.weather.weatherData.hourly;

    return (
        <UI.Card
            padding='$5'
            height={300}
            backgroundColor={'$background02'}
        >
            {isLoading && (<UI.Loader />)}
            {!isLoading && (
                <>
                    <UI.Card.Header size={'$0.5'}>
                        <UI.Typo.H6>
                            {t('meteo.daily.hourlyForecast.title')}
                        </UI.Typo.H6>
                    </UI.Card.Header>

                    <UI.ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <UI.XStack
                            verticalAlign='stretch'
                            justify='space-between'
                            gap='$4'
                            flex={1}
                        >
                            {hourly.map((i) => (
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
                                        <Format.Date variant='time' value={i.time} />
                                        <Format.Temp value={i.temperature_2m} />
                                        <Format.WmoIcon value={i.weather_code} />
                                        <Format.Precipitation
                                            value={i.precipitation_probability}
                                        />
                                        <Format.Humidity
                                            value={i.relative_humidity_2m}
                                        />
                                    </UI.YStack>
                                </UI.Card>
                            ))}
                        </UI.XStack>
                    </UI.ScrollView>
                </>
            )}
        </UI.Card>
    );
};

export default observer(HourlyForecast);
