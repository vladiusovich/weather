import GetGeoMagneticRequest from '@/api/rest/gfzGeoMagnetic/GetGeoMagneticRequest';
import GfzGeoMagneticRequest from '@/types/geoMagnetic/gfzGeoMagneticRequest';
import GfzGeoMagneticResponse from '@/types/geoMagnetic/gfzGeoMagneticResponse';

class GeoMagneticService {
    private geoMagneticRequest = new GetGeoMagneticRequest();

    public async fetch(request: GfzGeoMagneticRequest): Promise<GfzGeoMagneticResponse | null> {
        await this.geoMagneticRequest.execute(request);

        return this.geoMagneticRequest.data;
    }
}

export default GeoMagneticService;
