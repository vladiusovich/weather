import RequestBuilder from "../core/RequestBuilder";
import GfzGeoMagneticRequest from "@appTypes/geoMagnetic/gfzGeoMagneticRequest";
import GfzGeoMagneticResponse from "@appTypes/geoMagnetic/gfzGeoMagneticResponse";

type RequestDataType = GfzGeoMagneticRequest;
type ResponseDataType = GfzGeoMagneticResponse;

const GetGeoMagneticRequest = RequestBuilder.getType<
    RequestDataType,
    ResponseDataType
>(
    "geoMagnetic",
    {
        method: "get",
        url: "/json/", // the last "/" is required
        useParams: true,
        cacheTimeInSeconds: 60,
    });

export default GetGeoMagneticRequest;
