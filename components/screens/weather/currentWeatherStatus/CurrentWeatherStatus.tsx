import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import SolarTransitionInfo from '../solarTransitionInfo/SolarTransitionInfo';

const CurrentWeatherStatus: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();
    const current = appStore.weather.weatherData?.current;
    const currentKpIndex = appStore.weather.geoMagneticStore.currentKpIndex;

    return (
        <UI.Card padding='$4' bg={'$background02'}>
            <UI.XStack gap={'$1'} justify={'space-between'}>
                <UI.YStack justify={'space-between'} gap={'$2'}>
                    <UI.YStack gap={'$1'}>
                        <Format.WmoCode fontSize={'$1'} value={current?.weatherCode} />
                        <Format.Temp fontSize={'$10'} value={current?.apparentTemperature} />
                    </UI.YStack>

                    <UI.XStack gap={'$2'}>
                        <UI.Typo.Text>
                            {t('meteo.glossary.apparent_temperature')}
                        </UI.Typo.Text>
                        <Format.Temp value={current?.apparentTemperature} />
                    </UI.XStack>

                    {(current?.temperature2mMax || current?.temperature2mMax) && (
                        <UI.XStack gap='$2'>
                            {current?.temperature2mMax && (
                                <UI.XStack>
                                    <UI.Typo.Text>
                                        {t('meteo.glossary.temperature_2m_max')}
                                    </UI.Typo.Text><Format.Temp value={current?.temperature2mMax} />
                                </UI.XStack>
                            )}
                            {current?.temperature2mMax && (
                                <UI.XStack>
                                    <UI.Typo.Text>
                                        {t('meteo.glossary.temperature_2m_min')}
                                    </UI.Typo.Text>
                                    <Format.Temp value={current?.temperature2mMin} />
                                </UI.XStack>
                            )}
                        </UI.XStack>
                    )}
                </UI.YStack>

                <UI.YStack gap={'$2'} items={'flex-end'}>
                    <Format.KIndex
                        value={currentKpIndex}
                    />
                    <Format.Humidity
                        value={current?.relativeHumidity2m}
                    />
                    <SolarTransitionInfo />
                </UI.YStack>
            </UI.XStack>
        </UI.Card>
    );
};

export default observer(CurrentWeatherStatus);
