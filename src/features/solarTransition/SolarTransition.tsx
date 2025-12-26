import Format from "src/shared/components/format";
import UI, { Column } from "src/shared/components/ui";
import useAppContext from "@hooks/useAppContext";
import { observer } from "mobx-react-lite";

type RenderType = { time: string; sunrise: string; sunset: string; daylight: string; };

const SolarTransition = () => {
    const appStore = useAppContext();

    const daily = appStore.weather.weatherData.daily;

    const solarData = daily.map(d => ({
        time: d.time,
        sunrise: d.sunrise,
        sunset: d.sunset,
        daylight: d.daylightDuration,
    })) as RenderType[];

    const columns: Column<RenderType>[] = [
        {
            key: "time",
            title: "Date",
            render: (i => <Format.Date value={i.time} variant='date' />)
        },
        {
            key: "sunrise",
            title: "Sunrise",
            render: (i => <Format.Date value={i.sunrise} variant='time' />)
        },
        {
            key: "sunset",
            title: "Sunset",
            render: (i => <Format.Date value={i.sunset} variant='time' />)
        },
        {
            key: "daylight",
            title: "Daylight",
        },
    ];

    return (
        <UI.ScreenWrapper>
            <UI.Card padded>
                <UI.Table data={solarData} columns={columns} />
            </UI.Card>
        </UI.ScreenWrapper>
    );
};

export default observer(SolarTransition);
