import { VStack } from '@/components/ui/vstack';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { CurrentWeatherDataType } from '@/services/weather/types/WeatherDataType';
import { WeatherVariableType } from '@/services/weather/types/MeteoRequestType';
import styles from './WeatherItem.styles';

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
        <View style={styles.container}>
            <VStack space='md' reversed={false}>
                <Text bold size='sm'>
                    {label ?? variable}
                </Text>
                <Text bold size='sm'>
                    {value?.toString() ?? 'N/A'}
                </Text>
            </VStack>
        </View>
    );
};

export default WeatherItem;
