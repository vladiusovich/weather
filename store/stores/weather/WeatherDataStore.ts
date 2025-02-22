import { makeObservable, observable, runInAction } from 'mobx';
import { WeatherData } from '@/services/weather/types/WeatherData';
import WeatherSettingsStore from './WeatherSettingsStore';
import OpenMeteoService from '@/services/weather/types/weather/openMeteoService';
import { LocationCoords } from '@/services/weather/types/LocationCoords';

type ConstructorArgsType = {
    weatherSettings: WeatherSettingsStore;
};

class WeatherDataStore {
    public data: WeatherData | null = null;
    public openMeteoService: OpenMeteoService = new OpenMeteoService();

    constructor(protected args: ConstructorArgsType) {
        makeObservable(this, {
            data: observable,
        });
    }

    async fetch(location: LocationCoords): Promise<void> {
        const settings = this.args.weatherSettings.settings;

        const weather = await this.openMeteoService.fetch({
            ...settings,
            ...location,
            timezone: 'GMT',
        });

        runInAction(() => {
            this.data = weather;
        });
    }
}

export default WeatherDataStore;
