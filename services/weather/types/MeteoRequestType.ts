const weatherVariables = [
    'temperature_2m',
    'relative_humidity_2m',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature',
    'weather_code',
] as const;

export type WeatherVariableType = (typeof weatherVariables)[number];

const weatherPeriods = ['current', 'daily', 'hourly'] as const;

export type WeatherPeriodType = (typeof weatherPeriods)[number];

export type WeatherPeriodsRequestType = Partial<{
    [key in WeatherPeriodType]: WeatherVariableType[] | null;
}>;

export type MeteoRequestType = {
    latitude: number;
    longitude: number;
    timezone?: string;
} & WeatherPeriodsRequestType;
