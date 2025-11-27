import GeoIndexType from "./geoIndex";

type GeoIndexResultType = Partial<Record<GeoIndexType, number[]>>;

interface GfzGeoMagneticResponse extends GeoIndexResultType {
    meta: {
        source: string;
        license: string;
    };
    datetime: string[];
}

export default GfzGeoMagneticResponse;
