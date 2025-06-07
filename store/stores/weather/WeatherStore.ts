import { ServicesRootType } from '@/services';
import GeoMagneticStore from './GeoMagneticStore';
import WeatherDataStore from './WeatherDataStore';
import WeatherSettingsStore from './WeatherSettingsStore';

class WeatherStore {
    public weatherData: WeatherDataStore;
    public weatherSettings: WeatherSettingsStore;
    public geoMagneticStore: GeoMagneticStore;

    constructor(services: ServicesRootType) {
        this.weatherSettings = new WeatherSettingsStore();
        this.geoMagneticStore = new GeoMagneticStore();
        this.weatherData = new WeatherDataStore({
            weatherSettings: this.weatherSettings,
            openMeteoService: services.openMeteoService,
        });
    }
}

export default WeatherStore;
