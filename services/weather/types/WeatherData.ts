import { WeatherVariable } from './MeteoRequest';

type Time = {
    time: Date | Date[];
};

export type CurrentWeatherData = Partial<
    Record<WeatherVariable, number | null>
> &
    Time;

export type HourlyWeatherData = Partial<
    Record<WeatherVariable, (number | null)[]>
> &
    Time;

export type DailyWeatherData = Partial<
    Record<WeatherVariable, (number | null)[]>
> &
    Time;

export interface WeatherData {
    current?: CurrentWeatherData;
    hourly?: HourlyWeatherData;
    daily?: DailyWeatherData;
}
