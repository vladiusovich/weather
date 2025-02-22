import { makeObservable, observable, runInAction } from 'mobx';
import { getWeather } from '@/services/weather/openMeteo';
import { WeatherDataType } from '@/services/weather/types/WeatherDataType';
import WeatherSettingsStore from './WeatherSettingsStore';

type ConstructorArgsType = {
    weatherSettings: WeatherSettingsStore;
};

class WeatherDataStore {
    public data: WeatherDataType | null = null;

    constructor(protected args: ConstructorArgsType) {
        makeObservable(this, {
            data: observable,
        });
    }

    async fetch(): Promise<void> {
        const settings = this.args.weatherSettings.settings;

        const weather = await getWeather({
            ...settings,
            latitude: 52.52,
            longitude: 13.41,
            timezone: 'GMT',
        });

        runInAction(() => {
            this.data = weather;
        });
    }
}

export default WeatherDataStore;
