import Format from '@/components/common/format';
import UI, { Column } from '@/components/ui';
import useAppStore from '@/hooks/useAppStore';
import { observer } from 'mobx-react-lite';

type RenderType = { time: string; sunrise: string; sunset: string; daylight: string; };

const SolarTransition = () => {
    const appStore = useAppStore();

    const daily = appStore.weather.weatherData.daily;

    const solarData = daily.map(d => ({
        time: d.time,
        sunrise: d.sunrise,
        sunset: d.sunset,
        daylight: d.daylightDuration,
    })) as RenderType[];

    const columns: Column<RenderType>[] = [
        {
            key: 'time',
            title: 'Date',
            render: (i => <Format.Date value={i.time} variant='date' />)
        },
        {
            key: 'sunrise',
            title: 'Sunrise',
            render: (i => <Format.Date value={i.sunrise} variant='time' />)
        },
        {
            key: 'sunset',
            title: 'Sunset',
            render: (i => <Format.Date value={i.sunset} variant='time' />)
        },
        {
            key: 'daylight',
            title: 'Daylight',
        },
    ];

    return (
        <UI.Card
            padded
        >
            <UI.Table data={solarData} columns={columns} />
        </UI.Card>
    );
};

export default observer(SolarTransition);
