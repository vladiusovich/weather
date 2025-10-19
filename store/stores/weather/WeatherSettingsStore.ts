import { makeObservable, observable, runInAction } from "mobx";
import { LocationCoords } from "@/types/LocationCoords";

// Add DB support for weather settings.
class WeatherSettingsStore {
    public currentLocation: LocationCoords | null = null;

    constructor() {
        makeObservable(this, {
            currentLocation: observable,
        });
    }

    public saveLocation(location: LocationCoords) {
        runInAction(() => {
            this.currentLocation = location;
        });
    }
}

export default WeatherSettingsStore;
