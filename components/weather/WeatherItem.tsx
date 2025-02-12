import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
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
                <Text bold size='sm'>
                    {label ?? variable}
                </Text>
                <Text bold size='sm'>
                    {value?.toString() ?? 'N/A'}
                </Text>
            </VStack>
        </S.view>
    );
};

export default WeatherItem;
