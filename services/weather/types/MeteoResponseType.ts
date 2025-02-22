import { WeatherPeriodType, WeatherVariableType } from './MeteoRequestType';

type TimeType = {
    time: Date | Date[];
};

export type CurrentWeatherDataType = Partial<
    Record<WeatherVariableType, number | null | Float32Array>
> &
    TimeType;

export type DailyWeatherDataType = Partial<
    Record<WeatherVariableType, (number | null)[]>
> &
    TimeType;

export type WeatherPeriodsUnitsType = `${WeatherPeriodType}_units`;

export type WeatherUnitsResponseType = Partial<{
    [key in WeatherPeriodsUnitsType]: Partial<
        Record<WeatherVariableType, string>
    >;
}>;

export type MeteoResponseType = {
    current?: CurrentWeatherDataType;
    daily?: DailyWeatherDataType;
    latitude: number;
    longitude: number;
    timezone?: string;
} & WeatherUnitsResponseType;
