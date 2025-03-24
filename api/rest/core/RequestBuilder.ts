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
const instancies = {
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
    static instancies: ApiInstanceType = instancies;

    static getType<RequestDataType, ResponseDataType>(
        apiType: ApiUrlType,
        options: RequestOptionsType,
    ): RequestConstructor<RequestDataType, ResponseDataType> {
        const instance = RequestBuilder.instancies[apiType];

        return class extends BaseRequest<RequestDataType, ResponseDataType> {
            constructor() {
                // Pass the instance and the provided options to the BaseRequest constructor
                super(instance, options);
            }
        };
    }
}

export default RequestBuilder;
