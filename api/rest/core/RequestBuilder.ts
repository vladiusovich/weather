import apiUrls, { ApiUrlType } from './apiUrls';
import AxiosClientApiEndpoint from './AxiosClientApiEndpoint';
import BaseRequest, { RequestOptionsType } from './BaseRequest';
import { ClientApiEndpoint } from './ClientApiEndpoint';

type RequestConstructor<TRequest, TResponse> = new () => BaseRequest<
    TRequest,
    TResponse
>;

type ApiInstanceType = Record<ApiUrlType, ClientApiEndpoint>;

// TODO: dynamic init?
const endpoints = {
    meteo: new AxiosClientApiEndpoint({
        baseURL: apiUrls.meteo,
        timeout: 10000,
    }),
    geoMagnetic: new AxiosClientApiEndpoint({
        baseURL: apiUrls.geoMagnetic,
        timeout: 10000,
    }),
};

class RequestBuilder {
    static endpoints: ApiInstanceType = endpoints;

    static getType<RequestDataType, ResponseDataType>(
        apiType: ApiUrlType,
        options: RequestOptionsType,
    ): RequestConstructor<RequestDataType, ResponseDataType> {
        const endpoint = RequestBuilder.endpoints[apiType];
        return class extends BaseRequest<RequestDataType, ResponseDataType> {
            constructor() {
                // Pass the instance and the provided options to the BaseRequest constructor
                super(endpoint, options);
            }
        };
    }
}

export default RequestBuilder;
