import axios, { AxiosInstance } from "axios";
import {
    IHttpClient,
    IHttpClientOptions,
    IHttpClientResponse,
} from "./IHttpClient";


/*
    TODO:
    - Implement cache and test it
*/
class AxiosHttpClient implements IHttpClient {
    private instance: AxiosInstance;

    constructor(options: IHttpClientOptions) {
        this.instance = axios.create(options);
    }

    public async request<T>(config: any): Promise<IHttpClientResponse<T>> {
        const response = await this.instance.request<T>(config);

        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    };
}

export default AxiosHttpClient;
