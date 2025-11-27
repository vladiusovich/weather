import GetGeoMagneticRequest from "@api/rest/gfzGeoMagnetic/GetGeoMagneticRequest";
import GfzGeoMagneticRequest from "@appTypes/geoMagnetic/gfzGeoMagneticRequest";
import { GeoMagneticData } from "../weather/types/models/GeoMagneticData";

class GeoMagneticService {
    private geoMagneticRequest = new GetGeoMagneticRequest();

    public async fetch(request: GfzGeoMagneticRequest): Promise<GeoMagneticData | null> {
        await this.geoMagneticRequest.execute(request);
        return this.geoMagneticRequest.data;
    }
}

export default GeoMagneticService;
