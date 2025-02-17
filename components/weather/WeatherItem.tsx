import Typography from '@/components/ui/typography';
import { CurrentWeatherDataType } from '@/services/weather/types/WeatherDataType';
import { WeatherVariableType } from '@/services/weather/types/MeteoRequestType';
import S from './WeatherItem.styled';
import UI from '../ui';

interface WeatherItemProps {
    label?: string;
    variable?: WeatherVariableType;
    value?: CurrentWeatherDataType;
}

const WeatherItem: React.FC<WeatherItemProps> = ({
    label,
    variable,
    value,
}) => {
    return (
        <S.view>
            <UI.Stack>
                <Typography variant='xsmall' color='regular.100'>
                    {label ?? variable}
                </Typography>
                <Typography variant='small' color='regular.100'>
                    {value?.toString() ?? 'N/A'}
                </Typography>
            </UI.Stack>
        </S.view>
    );
};

export default WeatherItem;
