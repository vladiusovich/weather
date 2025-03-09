import Format from '@/components/common/format';
import UI, { Column } from '@/components/ui';
import useAppStore from '@/hooks/useAppStore';

type RenderType = { time: string; sunrise: string; sunset: string };

const SolarTransition = () => {
    const appStore = useAppStore();

    const daily = appStore.weather.weatherData.daily;

    const solarData = daily.map(d => ({
        time: d.time,
        sunrise: d.sunrise,
        sunset: d.sunset,
    })) as RenderType[];

    const columns: Column<RenderType>[] = [
        {
            key: 'time',
            title: 'Time',
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
    ];

    return (
        <UI.ScreenView>
            <UI.Card
                padded
            >
                <UI.Table data={solarData} columns={columns} />
            </UI.Card>
        </UI.ScreenView>
    );
};

export default SolarTransition;
