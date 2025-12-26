import SolarTransition from "src/features/solarTransition/SolarTransition";
import { Stack } from "expo-router";

const SolarTransitionScreen = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Sunrise and sunset",
                }}
            />
            <SolarTransition />
        </>
    );
};

export default SolarTransitionScreen;
