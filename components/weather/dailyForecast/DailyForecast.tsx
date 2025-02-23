import S from './DailyForecast.styled';
import { useTranslation } from 'react-i18next';
import UI from '@/components/ui';
import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';

interface Props { }

const DailyForecast: React.FC<Props> = () => {
    const { t } = useTranslation();
    const appStore = useAppStore();

    const daily = appStore.weather.weatherData.daily;

    return (
        <S.view>
            <UI.ScrollView horizontal>
                <UI.Stack
                    direction='row'
                    justifyContent='space-around'
                    gap='50px'>
                    {daily.map((i) => (
                        <UI.Stack
                            key={i.time}
                            direction='column'
                            justifyContent='space-around'
                            alignItems='center'>
                            <Format.Date value={i.time} asDayOfWeek />
                            <Format.Temp
                                value={i.temperature_2m_max}
                                color='regular.100'
                            />
                            <Format.Temp
                                value={i.temperature_2m_min}
                                variant='small'
                                color='regular.100'
                            />
                        </UI.Stack>
                    ))}
                </UI.Stack>
            </UI.ScrollView>
        </S.view>
    );
};

export default observer(DailyForecast);
