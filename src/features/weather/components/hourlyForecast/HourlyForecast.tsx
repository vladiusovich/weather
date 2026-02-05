import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import useAppContext from "@hooks/useAppContext";
import Format from "src/shared/components/format";
import {
    Clock3,
} from "@tamagui/lucide-icons";
import { getNow, isSameHour } from "@utils/datetime.helper";
import ScrollableForecast from "../scrollableForecast/ScrollableForecast";
import ForecastItem from "../scrollableForecast/ForecastItem";


const HourlyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppContext();

    const hourly = appStore.weather.weatherData.hourly;
    const now = getNow();
    return (
        <ScrollableForecast
            header={t("meteo.hourly.hourlyForecast.title")}
            headerIcon={<Clock3 size={"$1"} />}
        >
            {hourly.map((i) => {
                const isCurrent = isSameHour(now, i.time);
                return (
                    <ForecastItem key={i.time} current={isCurrent}>
                        <Format.Date variant='time' value={i.time} />
                        <Format.Temp value={i.temperature2m} />
                        <Format.WmoIcon value={i.weatherCode} />
                        <Format.Precipitation
                            value={i.precipitationProbability}
                        />
                        <Format.Humidity
                            value={i.relativeHumidity2m}
                        />
                    </ForecastItem>
                );
            })}
        </ScrollableForecast>
    );
};

export default observer(HourlyForecast);
