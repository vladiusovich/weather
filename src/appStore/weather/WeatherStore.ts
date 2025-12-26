import { AppServicesRootType } from "@services/AppServicesRootType";
import GeoMagneticStore from "./GeoMagneticStore";
import WeatherDataStore from "./WeatherDataStore";
import WeatherSettingsStore from "./WeatherSettingsStore";

class WeatherStore {
    public weatherData: WeatherDataStore;
    public weatherSettings: WeatherSettingsStore;
    public geoMagneticStore: GeoMagneticStore;

    constructor(services: AppServicesRootType) {
        this.weatherSettings = new WeatherSettingsStore();
        this.geoMagneticStore = new GeoMagneticStore({
            geoMagneticService: services.geoMagneticService,
        });
        this.weatherData = new WeatherDataStore({
            weatherSettings: this.weatherSettings,
            openMeteoService: services.openMeteoService,
        });
    }
}

export default WeatherStore;
