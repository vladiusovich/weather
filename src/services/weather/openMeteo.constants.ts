import { Settings } from "../settings/settings";

const requestConfiguration: Settings = {
    current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "weather_code",
        "pressure_msl",
        "surface_pressure",
        "wind_speed_10m",
        "wind_direction_10m",
        "relative_humidity_2m",
    ],
    daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_mean",
        "apparent_temperature_max",
        "apparent_temperature_min",
        "sunrise",
        "sunset",
        "daylight_duration",
    ],
    hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation_probability",
        "weather_code",
        "pressure_msl",
        "surface_pressure",
    ],
} as const;

export const openMeteo = {
    requestConfiguration,
};