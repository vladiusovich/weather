import GfzGeoMagneticRequest from "@appTypes/geoMagnetic/gfzGeoMagneticRequest";
import { GeoMagneticData } from "../weather/types/models/GeoMagneticData";
import GeoMagneticApi from "@api/rest/gfzGeoMagnetic/GeoMagneticApi";

class GeoMagneticService {
    constructor(private geoMagneticApi: GeoMagneticApi) { }

    public async fetch(request: GfzGeoMagneticRequest): Promise<GeoMagneticData | null> {
        const data = await this.geoMagneticApi.fetchData(request);
        return data;
    }
}

export default GeoMagneticService;
