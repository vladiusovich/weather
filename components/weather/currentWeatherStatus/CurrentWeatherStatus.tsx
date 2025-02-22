import S from './CurrentWeatherStatus.styled';
import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';

interface Props {}

const CurrentWeatherStatus: React.FC<Props> = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const current = appStore.weather.weatherData.data?.current;
    const isLoading = !current;

    if (isLoading) {
        return <UI.Typography variant='xsmall'>Loading...</UI.Typography>;
    }

    return (
        <S.view>
            <UI.Stack direction='row' justifyContent='space-between'>
                <UI.Stack direction='column'>
                    <UI.Typography variant='xsmall' color='regular.100'>
                        {t(`meteo.glossary.temperature_2m`)}
                    </UI.Typography>
                    <UI.Typography variant='small' color='regular.100'>
                        {current.temperature_2m ?? 'N/A'}
                    </UI.Typography>
                </UI.Stack>

                <UI.Stack direction='column'>
                    <UI.Typography variant='xsmall' color='regular.100'>
                        {t(`meteo.glossary.apparent_temperature`)}
                    </UI.Typography>
                    <UI.Typography variant='small' color='regular.100'>
                        {current.apparent_temperature ?? 'N/A'}
                    </UI.Typography>
                </UI.Stack>
            </UI.Stack>
        </S.view>
    );
};

export default observer(CurrentWeatherStatus);
