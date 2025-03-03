import Format from '@/components/common/format';
import UI from '@/components/ui';
import useAppStore from '@/hooks/useAppStore';
import { Sunrise, Sunset } from '@tamagui/lucide-icons';

const SolarTransitionScreen = () => {
    const appStore = useAppStore();

    const daily = appStore.weather.weatherData.daily;

    const solarData = daily.map(d => ({ sunrise: d.sunrise, sunset: d.sunset }));

    return (
        <UI.Screen>
            <UI.Card
                padded
            >
                <UI.YStack
                    gap={'$3'}
                >
                    <UI.XStack
                        justify={'space-around'}
                    >
                        <Sunrise size={'$1'} />
                        <Sunset size={'$1'} />
                    </UI.XStack>
                    <UI.Separator />
                    {solarData.map(s => {
                        return (
                            <>
                                <UI.XStack
                                    key={s.sunrise}
                                    justify={'space-around'}
                                >
                                    <Format.Date variant='time' value={s.sunrise as string} />
                                    <Format.Date variant='time' value={s.sunset as string} />
                                </UI.XStack>
                                <UI.Separator />
                            </>
                        )
                    })}
                </UI.YStack>
            </UI.Card>
        </UI.Screen>
    );
};

export default SolarTransitionScreen;
