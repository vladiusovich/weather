import { WeatherPeriod, WeatherVariable } from './MeteoRequest';

type Time = {
    time: Date | Date[];
};

export type CurrentWeatherData = Partial<
    Record<WeatherVariable, number | null>
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
    daily?: DailyWeatherData;
    latitude: number;
    longitude: number;
    timezone?: string;
} & WeatherUnitsResponse;
