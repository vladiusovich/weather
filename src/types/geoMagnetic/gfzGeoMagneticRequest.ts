import GeoIndexType from "./geoIndex";

interface GfzGeoMagneticRequest {
    start: string;
    end: string;
    index: GeoIndexType;
};

export default GfzGeoMagneticRequest;
