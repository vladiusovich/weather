import { LocationCoords } from './LocationCoords';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const weatherVariables = [
    'temperature_2m',
    'relative_humidity_2m',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature',
    'precipitation',
    'precipitation_sum',
    'weather_code',
    'pressure_msl',
    'precipitation_probability_mean',
    'precipitation_probability',
    'surface_pressure',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'sunrise',
    'sunset'
] as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const weatherPeriods = ['current', 'daily', 'hourly'] as const;

export type WeatherVariable = (typeof weatherVariables)[number];

export type WeatherPeriod = (typeof weatherPeriods)[number];

export type WeatherPeriodsRequest = Partial<{
    [key in WeatherPeriod]: WeatherVariable[] | null;
}>;

export type MeteoRequest = {
    timezone?: string;
} & WeatherPeriodsRequest &
    LocationCoords;
