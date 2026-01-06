import GeoMagneticApi from "./gfzGeoMagnetic/GeoMagneticApi";
import OpenMeteoApi from "./openMeteo/OpenMeteoApi";

export interface AppApiLayer {
    geoMagneticApi: GeoMagneticApi,
    meteo: OpenMeteoApi;
}
