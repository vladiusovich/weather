import axios, { AxiosInstance } from "axios";
import {
    ClientApiEndpoint,
    ClientApiEndpointOptions,
} from "./ClientApiEndpoint";

class AxiosClientApiEndpoint implements ClientApiEndpoint {
    private instance: AxiosInstance;

    constructor(options: ClientApiEndpointOptions) {
        this.instance = axios.create(options);
    }

    public request = <T>(config: any) => {
        return this.instance.request<T>(config);
    };
}

export default AxiosClientApiEndpoint;
