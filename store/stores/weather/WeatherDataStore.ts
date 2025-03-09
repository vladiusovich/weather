import { computed, makeObservable, observable, runInAction } from 'mobx';
import { WeatherData } from '@/services/weather/types/WeatherData';
import WeatherSettingsStore from './WeatherSettingsStore';
import OpenMeteoService from '@/services/weather/types/weather/openMeteoService';
import { LocationCoords } from '@/services/weather/types/LocationCoords';
import { getNow, isSameHour, toDate } from '@/utils/datetime.helper';

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
            hourly: computed,
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

        return time.map((t: string, index: number) => ({
            time: t,
            temperature_2m_max: daily!.temperature_2m_max![index],
            temperature_2m_min: daily!.temperature_2m_min![index],
            weather_code: daily!.weather_code![index],
            precipitation_probability_mean:
                daily!.precipitation_probability_mean![index],
            sunrise: daily?.sunrise![index],
            sunset: daily?.sunset![index],
        }));
    }

    public get hourly() {
        const hourly = this.data?.hourly;
        const time: string[] = Array.isArray(hourly?.time)
            ? hourly?.time
            : hourly?.time
                ? [hourly?.time]
                : [];

        const now = getNow();
        const currentIndex = time.findIndex(t => isSameHour(now, toDate(t)));

        const actualTime = time.slice(currentIndex);

        return actualTime.map((t: string, index: number) => ({
            time: t,
            temperature_2m: hourly!.temperature_2m![index],
            relative_humidity_2m: hourly!.relative_humidity_2m![index],
            weather_code: hourly!.weather_code![index],
            apparent_temperature: hourly!.apparent_temperature![index],
            precipitation_probability: hourly!.precipitation_probability![index],
            pressure_msl: hourly!.pressure_msl![index],
            surface_pressure: hourly!.surface_pressure![index],
        }));
    }
}

export default WeatherDataStore;
