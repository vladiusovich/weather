import { makeObservable } from 'mobx';
import { SettingsType } from '@/services/weather/types/settings/SettingsType';

// TODO: implement configrable weather's settings
// Add DB support for weather settings.
class WeatherSettingsStore {
    public settings: SettingsType = {
        current: ['temperature_2m', 'apparent_temperature', 'weather_code'],
        daily: ['temperature_2m_max', 'weather_code'],
    };

    constructor() {
        makeObservable(this, {});
    }
}

export default WeatherSettingsStore;
