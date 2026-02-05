import apiUrls from "../core/apiUrls";
import AxiosHttpClient from "../core/httpClient/AxiosHttpClient";
import { IHttpClient } from "../core/httpClient/IHttpClient";
import { MeteoRequest } from "@appTypes/weather/MeteoRequest";
import { MeteoResponse } from "@appTypes/weather/MeteoResponse";

class OpenMeteoApi {
    private httpClient: IHttpClient = new AxiosHttpClient({
        baseURL: apiUrls.meteo,
        timeout: 10000,
    });

    public async fetchData(request: MeteoRequest) {
        const d = await this.httpClient.request<MeteoResponse>({
            method: "GET",
            url: "/forecast",
            params: request,
            cacheTimeInSeconds: 60,
        });

        return d.data;
    }
};

export default OpenMeteoApi;

