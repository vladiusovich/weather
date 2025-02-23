import { computed, makeObservable, observable, runInAction } from 'mobx';
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
            current: computed,
            daily: computed,
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

    public get current() {
        return this.data?.current;
    }

    public get daily() {
        const daily = this.data?.daily;
        const time: string[] = Array.isArray(daily?.time)
            ? daily?.time
            : daily?.time
              ? [daily?.time]
              : [];

        return time.map((time: string, index: number) => ({
            time,
            temperature_2m_max: daily!.temperature_2m_max![index],
            temperature_2m_min: daily!.temperature_2m_min![index],
        }));
    }
}

export default WeatherDataStore;
