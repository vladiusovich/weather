import { makeObservable } from 'mobx';
import { Settings } from '@/services/weather/types/settings/Settings';

// TODO: implement configrable weather's settings
// Add DB support for weather settings.
class WeatherSettingsStore {
    public settings: Settings = {
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'precipitation',
            'weather_code',
            'pressure_msl',
            'surface_pressure',
        ],
        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_probability_mean',
            'apparent_temperature_max',
            'apparent_temperature_min',
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
    }

    constructor() {
        makeObservable(this, {});
    }
}

export default WeatherSettingsStore;
