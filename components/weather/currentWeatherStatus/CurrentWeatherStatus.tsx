import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';

interface Props { }

const CurrentWeatherStatus: React.FC<Props> = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const current = appStore.weather.weatherData?.current;

    const isLoading = !current;

    if (isLoading) {
        return <UI.Typo.Text>Loading...</UI.Typo.Text>;
    }

    return (
        <UI.YStack justify='center' bg={'$black10'}>
            <UI.YStack justify={'space-between'}>
                {current.weather_code && (
                    <UI.YStack>
                        <Format.WmoCode value={current.weather_code} />
                    </UI.YStack>
                )}

                <UI.YStack>
                    <Format.Temp value={current?.apparent_temperature} />
                </UI.YStack>

                <UI.XStack verticalAlign='center'>
                    <UI.Typo.Text>
                        {t(`meteo.glossary.apparent_temperature`)}
                    </UI.Typo.Text>
                    <Format.Temp value={current?.apparent_temperature} />
                </UI.XStack>

                {/* TODO: added min/max */}
                <UI.XStack gap='$2'>
                    <UI.XStack>
                        <UI.Typo.Text>
                            {t(`meteo.glossary.temperature_2m_max`)}
                        </UI.Typo.Text>
                        <Format.Temp value={current?.temperature_2m_max} />
                    </UI.XStack>
                    <UI.XStack>
                        <UI.Typo.Text>
                            {t(`meteo.glossary.temperature_2m_min`)}
                        </UI.Typo.Text>
                        <Format.Temp value={current?.temperature_2m_min} />
                    </UI.XStack>
                </UI.XStack>
            </UI.YStack>
        </UI.YStack>
    );
};

export default observer(CurrentWeatherStatus);
