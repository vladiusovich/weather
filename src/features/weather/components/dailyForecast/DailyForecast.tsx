import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import useAppContext from "@hooks/useAppContext";
import Format from "src/shared/components/format";
import { Calendar } from "@tamagui/lucide-icons";
import { isSameDay, getNow } from "@utils/datetime.helper";
import ScrollableForecast from "../scrollableForecast/ScrollableForecast";
import ForecastItem from "../scrollableForecast/ForecastItem";

const DailyForecast: React.FC = () => {
    const { t } = useTranslation();
    const appStore = useAppContext();

    const daily = appStore.weather.weatherData.daily;
    const now = getNow();
    return (
        <ScrollableForecast
            header={t("meteo.daily.nDayForecast.title")}
            headerIcon={<Calendar size={"$1"} />}
        >
            {daily.map((i) => {
                const isCurrent = isSameDay(now, i.time);
                return (
                    <ForecastItem key={i.time} current={isCurrent}>
                        <Format.Date variant='dayOfWeek' value={i.time} asDayOfWeek />
                        <Format.Temp value={i.temperature2mMax} />
                        <Format.WmoIcon value={i.weatherCode} />
                        <Format.Precipitation
                            value={i.precipitationProbabilityMean}
                        />
                        <Format.Temp value={i.temperature2mMin} />
                    </ForecastItem>
                );
            })}
        </ScrollableForecast>
    );
};

export default observer(DailyForecast);
