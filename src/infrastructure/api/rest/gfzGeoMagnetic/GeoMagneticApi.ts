import GfzGeoMagneticRequest from "@appTypes/geoMagnetic/gfzGeoMagneticRequest";
import GfzGeoMagneticResponse from "@appTypes/geoMagnetic/gfzGeoMagneticResponse";
import apiUrls from "../core/apiUrls";
import AxiosHttpClient from "../core/httpClient/AxiosHttpClient";
import { IHttpClient } from "../core/httpClient/IHttpClient";

class GeoMagneticApi {
    private httpClient: IHttpClient = new AxiosHttpClient({
        baseURL: apiUrls.geoMagnetic,
        timeout: 10000,
    });

    public async fetchData(request: GfzGeoMagneticRequest) {
        const d = await this.httpClient.request<GfzGeoMagneticResponse>({
            method: "get",
            url: "/json/", // the last "/" is required
            cacheTimeInSeconds: 60,
            params: request,
        });

        return d.data;
    }
};

export default GeoMagneticApi;

