import { makeObservable, observable, runInAction } from 'mobx';
import { getWeather } from '@/services/weather/openMeteo';
import { WeatherDataType } from '@/services/weather/types/WeatherDataType';

class WeatherStore {
    public data: WeatherDataType | null = null;

    constructor() {
        makeObservable(this, {
            data: observable,
        });
    }

    async fetch(): Promise<void> {
        const weather = await getWeather({
            latitude: 52.52,
            longitude: 13.41,
            current: [
                'temperature_2m',
                'relative_humidity_2m',
                'apparent_temperature',
                'weather_code',
            ],
            daily: ['temperature_2m_max'],
            timezone: 'GMT',
        });

        runInAction(() => {
            this.data = weather;
        });
    }
}

export default WeatherStore;
