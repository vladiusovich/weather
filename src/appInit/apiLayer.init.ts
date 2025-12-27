import GeoMagneticApi from "@api/rest/gfzGeoMagnetic/GeoMagneticApi";
import { AppApiLayer } from "@api/rest/AppApiLayer";
import OpenMeteoApi from "@api/rest/openMeteo/OpenMeteoApi";

const initApiLayer = async (): Promise<AppApiLayer> => {
    const api = {
        geoMagneticApi: new GeoMagneticApi(),
        meteo: new OpenMeteoApi(),
    };

    return api;
};

export default initApiLayer;
