import { computed, makeObservable, observable, runInAction } from 'mobx';
import WeatherSettingsStore from './WeatherSettingsStore';
import OpenMeteoService from '@/services/weather/openMeteoService';
import { LocationCoords } from '@/types/LocationCoords';
import { getNow, isSameHour, formatSecondsToTime } from '@/utils/datetime.helper';
import { MeteoData } from '@/services/weather/types/models/MeteoData';

type ConstructorArgsType = {
    weatherSettings: WeatherSettingsStore;
};

class WeatherDataStore {
    public data: MeteoData | null = null;
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
        const time = daily?.time ?? [];

        return time.map((t: string, index: number) => ({
            time: t,
            temperature2mMax: daily!.temperature2mMax[index],
            temperature2mMin: daily!.temperature2mMin[index],
            weatherCode: daily!.weatherCode[index],
            precipitationProbabilityMean:
                daily!.precipitationProbabilityMean[index],
            sunrise: daily?.sunrise![index],
            sunset: daily?.sunset![index],
            daylightDuration: formatSecondsToTime(daily?.daylightDuration![index] ?? 0),
        }));
    }

    public get hourly() {
        const hourly = this.data?.hourly;
        const time = hourly?.time ?? [];

        const now = getNow();
        const currentIndex = time.findIndex(t => isSameHour(now, t));
        const actualTime = time.slice(currentIndex);
        return actualTime.map((t: string, index: number) => ({
            time: t,
            temperature2m: hourly!.temperature2m[index],
            relativeHumidity2m: hourly!.relativeHumidity2m[index],
            weatherCode: hourly!.weatherCode[index],
            apparentTemperature: hourly!.apparentTemperature[index],
            precipitationProbability: hourly!.precipitationProbability[index],
            pressureMsl: hourly!.pressureMsl[index],
            surfacePressure: hourly!.surfacePressure[index],
        }));
    }
}

export default WeatherDataStore;
