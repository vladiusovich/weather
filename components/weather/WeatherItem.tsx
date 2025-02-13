import { VStack } from '@/components/ui/vstack';
import Typography from '@/components/ui/typography';
import { CurrentWeatherDataType } from '@/services/weather/types/WeatherDataType';
import { WeatherVariableType } from '@/services/weather/types/MeteoRequestType';
import S from './WeatherItem.styled';

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
            <VStack space='md' reversed={false}>
                <Typography variant='xsmall' color='regular.100'>
                    {label ?? variable}
                </Typography>
                <Typography variant='small' color='regular.100'>
                    {value?.toString() ?? 'N/A'}
                </Typography>
            </VStack>
        </S.view>
    );
};

export default WeatherItem;
