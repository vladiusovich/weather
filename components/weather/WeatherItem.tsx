import { CurrentWeatherData } from '@/services/weather/types/WeatherData';
import { WeatherVariable } from '@/services/weather/types/MeteoRequest';
import UI from '../ui';
import { useTranslation } from 'react-i18next';
import { View } from 'tamagui';

interface WeatherItemProps {
    label?: string;
    variable: WeatherVariable;
    value?: CurrentWeatherData;
}

const WeatherItem: React.FC<WeatherItemProps> = ({
    label,
    variable,
    value,
}) => {
    const { t } = useTranslation();

    return (
        <View>
            <UI.YStack>
                <UI.Typo.Text>
                    {label ?? t(`meteo.glossary.${variable}`)}
                </UI.Typo.Text>
                <UI.Typo.Text>{value?.toString() ?? 'N/A'}</UI.Typo.Text>
            </UI.YStack>
        </View>
    );
};

export default WeatherItem;
