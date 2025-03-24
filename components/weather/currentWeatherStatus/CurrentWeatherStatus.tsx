import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';

const CurrentWeatherStatus: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const current = appStore.weather.weatherData?.current;
    const isLoading = !current;

    return (
        <UI.XStack
            gap={'$2'}
        >
            <UI.Card
                padding='$4'
                backgroundColor={'$background02'}
            >
                {isLoading && (<UI.Loader />)}
                {!isLoading && (
                    <UI.YStack
                        justify={'space-between'}
                        gap={'$2'}
                    >
                        <UI.YStack
                            gap={'$2'}
                        >
                            <Format.WmoIcon size={40} value={current?.weatherCode} />
                            <Format.WmoCode
                                fontSize={'$1'}
                                value={current?.weatherCode}
                            />
                        </UI.YStack>
                        <UI.Separator />

                        <UI.YStack>
                            <Format.Temp fontSize={'$10'} value={current?.apparentTemperature} />
                        </UI.YStack>

                        <UI.XStack gap={'$2'}>
                            <UI.Typo.Text>
                                {t('meteo.glossary.apparent_temperature')}
                            </UI.Typo.Text>
                            <Format.Temp value={current?.apparentTemperature} />
                        </UI.XStack>

                        {/* TODO: added min/max */}
                        <UI.XStack gap='$2'>
                            <UI.XStack>
                                <UI.Typo.Text>
                                    {t('meteo.glossary.temperature_2m_max')}
                                </UI.Typo.Text>
                                <Format.Temp value={current?.temperature2mMax} />
                            </UI.XStack>
                            <UI.XStack>
                                <UI.Typo.Text>
                                    {t('meteo.glossary.temperature_2m_min')}
                                </UI.Typo.Text>
                                <Format.Temp value={current?.temperature2mMin} />
                            </UI.XStack>
                        </UI.XStack>
                    </UI.YStack>
                )}
            </UI.Card>
        </UI.XStack>
    );
};

export default observer(CurrentWeatherStatus);
