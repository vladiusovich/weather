import { WeatherPeriod, WeatherVariable } from './MeteoRequest';

type Time = {
    time: string | string[];
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

export type WeatherPeriodsUnitsType = `${WeatherPeriod}_units`;

export type WeatherUnitsResponse = Partial<{
    [key in WeatherPeriodsUnitsType]: Partial<Record<WeatherVariable, string>>;
}>;

export type MeteoResponse = {
    current?: CurrentWeatherData;
    hourly?: HourlyWeatherData,
    daily?: DailyWeatherData;
    latitude: number;
    longitude: number;
    timezone?: string;
} & WeatherUnitsResponse;
