import GeoMagneticStore from './GeoMagneticStore';
import WeatherDataStore from './WeatherDataStore';
import WeatherSettingsStore from './WeatherSettingsStore';

class WeatherStore {
    public weatherData: WeatherDataStore;
    public weatherSettings: WeatherSettingsStore;
    public geoMagneticStore: GeoMagneticStore;

    constructor() {
        this.weatherSettings = new WeatherSettingsStore();
        this.geoMagneticStore = new GeoMagneticStore();
        this.weatherData = new WeatherDataStore({
            weatherSettings: this.weatherSettings,
        });
    }
}

export default WeatherStore;
