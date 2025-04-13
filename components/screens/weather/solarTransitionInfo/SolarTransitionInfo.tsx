import { observer } from 'mobx-react-lite';
import useAppStore from '@/hooks/useAppStore';
import Format from '@/components/common/format';
import UI from '@/components/ui';
import { Sunrise, Sunset } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

const SolarTransitionInfo: React.FC = () => {
    const appStore = useAppStore();
    const router = useRouter();

    const onPress = () => {
        router.push('/solarTransition')
    }

    const daily = appStore.weather.weatherData.daily;
    return (
        <UI.Card
            padding='$3'
            bg={'$background02'}
            onPress={onPress}
        >
            <UI.XStack
                justify='space-around'
                paddingInline={'$1'}
                gap={'$5'}
            >
                <UI.YStack items={'center'}>
                    <Sunrise size={'$1'} />
                    <Format.Date fontSize={'$1'} variant='time' value={daily[0]?.sunrise as string ?? ''} />
                </UI.YStack>

                <UI.YStack items={'center'}>
                    <Sunset size={'$1'} />
                    <Format.Date fontSize={'$1'} variant='time' value={daily[0]?.sunset as string ?? ''} />
                </UI.YStack>
            </UI.XStack>
        </UI.Card>
    );
};

export default observer(SolarTransitionInfo);
