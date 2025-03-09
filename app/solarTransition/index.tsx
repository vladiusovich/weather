import SolarTransition from '@/components/screens/solarTransition/SolarTransition';
import { Stack } from 'expo-router';

const SolarTransitionScreen = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Sunrise and sunset',
                }}
            />
            <SolarTransition />
        </>
    );
};

export default SolarTransitionScreen;
