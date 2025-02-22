import WeatherDataStore from './WeatherDataStore';
import WeatherSettingsStore from './WeatherSettingsStore';

class WeatherStore {
    public weatherData: WeatherDataStore;
    public weatherSettings: WeatherSettingsStore;

    constructor() {
        this.weatherSettings = new WeatherSettingsStore();
        this.weatherData = new WeatherDataStore({
            weatherSettings: this.weatherSettings,
        });
    }
}

export default WeatherStore;
