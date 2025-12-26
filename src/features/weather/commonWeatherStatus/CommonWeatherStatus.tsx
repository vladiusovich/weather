import UI from "src/shared/components/ui";
import { observer } from "mobx-react-lite";
import useAppContext from "@hooks/useAppContext";
import SolarTransitionCard from "./solarTransitionCard/SolarTransitionCard";
import HumidityCard from "./humidityCard/HumidityCard";
import KIndexCard from "./KIndexCard/KIndexCard";
import CurrentTemperatureCard from "./currentTemperatureCard/CurrentTemperatureCard";

const CurrentWeatherStatus: React.FC = () => {
    const appStore = useAppContext();
    const current = appStore.weather.weatherData?.current ?? {};
    const currentKpIndex = appStore.weather.geoMagneticStore.currentKpIndex;

    return (
        <UI.XStack gap="$2" justify={"space-between"} items={"stretch"}>
            <CurrentTemperatureCard {...current} />
            <HumidityCard value={current?.relativeHumidity2m} />
            <KIndexCard value={currentKpIndex} />
            <SolarTransitionCard />
        </UI.XStack >
    );
};

export default observer(CurrentWeatherStatus);
