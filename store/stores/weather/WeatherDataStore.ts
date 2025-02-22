import { makeObservable, observable, runInAction } from 'mobx';
import { WeatherDataType } from '@/services/weather/types/WeatherDataType';
import WeatherSettingsStore from './WeatherSettingsStore';
import OpenMeteoService from '@/services/weather/openMeteoService';

type ConstructorArgsType = {
    weatherSettings: WeatherSettingsStore;
};

class WeatherDataStore {
    public data: WeatherDataType | null = null;
    public openMeteoService: OpenMeteoService = new OpenMeteoService();

    constructor(protected args: ConstructorArgsType) {
        makeObservable(this, {
            data: observable,
        });
    }

    async fetch(): Promise<void> {
        const settings = this.args.weatherSettings.settings;

        const weather = await this.openMeteoService.fetch({
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
