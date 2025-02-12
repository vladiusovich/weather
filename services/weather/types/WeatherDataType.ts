import { WeatherVariableType } from './MeteoRequestType';

type TimeType = {
    time: Date | Date[];
};

export type CurrentWeatherDataType = Partial<
    Record<WeatherVariableType, number | null | Float32Array>
> &
    TimeType;

export type HourlyWeatherDataType = Partial<
    Record<WeatherVariableType, (number | null)[]>
> &
    TimeType;

export type DailyWeatherDataType = Partial<
    Record<WeatherVariableType, (number | null)[]>
> &
    TimeType;

export interface WeatherDataType {
    current?: CurrentWeatherDataType;
    hourly?: HourlyWeatherDataType;
    daily?: DailyWeatherDataType;
}
