import S from './CurrentWeatherStatus.styled';
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
        return <UI.Typography variant='xsmall'>Loading...</UI.Typography>;
    }

    return (
        <S.stack direction='row' justifyContent='center'>
            <S.view>
                <UI.Stack direction='column' justifyContent='space-between'>
                    {current.weather_code && (
                        <UI.Stack direction='column'>
                            <Format.WmoCode
                                variant='xsmall'
                                color='regular.100'
                                value={current.weather_code}
                            />
                        </UI.Stack>
                    )}

                    <UI.Stack direction='column'>
                        <Format.Temp
                            variant='header'
                            color='regular.100'
                            value={current?.apparent_temperature}
                        />
                    </UI.Stack>

                    <UI.Stack direction='row' alignItems='center'>
                        <UI.Typography variant='xsmall' color='regular.100'>
                            {t(`meteo.glossary.apparent_temperature`)}
                        </UI.Typography>
                        <Format.Temp
                            variant='small'
                            color='regular.100'
                            value={current?.apparent_temperature}
                        />
                    </UI.Stack>

                    {/* TODO: added min/max */}
                    <UI.Stack direction='row' gap='20px'>
                        <UI.Stack direction='row'>
                            <UI.Typography variant='xsmall' color='regular.100'>
                                {t(`meteo.glossary.temperature_2m_max`)}
                            </UI.Typography>
                            <Format.Temp
                                variant='xsmall'
                                color='regular.100'
                                value={current?.temperature_2m_max}
                            />
                        </UI.Stack>
                        <UI.Stack direction='row'>
                            <UI.Typography variant='xsmall' color='regular.100'>
                                {t(`meteo.glossary.temperature_2m_min`)}
                            </UI.Typography>
                            <Format.Temp
                                variant='xsmall'
                                color='regular.100'
                                value={current?.temperature_2m_min}
                            />
                        </UI.Stack>
                    </UI.Stack>
                </UI.Stack>
            </S.view>
        </S.stack>
    );
};

export default observer(CurrentWeatherStatus);
