import { makeObservable } from 'mobx';
import { Settings } from '@/services/weather/types/settings/Settings';

// TODO: implement configrable weather's settings
// Add DB support for weather settings.
class WeatherSettingsStore {
    public settings: Settings = {
        current: ['temperature_2m', 'apparent_temperature', 'weather_code'],
        daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
    };

    constructor() {
        makeObservable(this, {});
    }
}

export default WeatherSettingsStore;
