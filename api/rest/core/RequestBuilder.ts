import AxiosClientApiEndpoint from './AxiosClientApiEndpoint';
import BaseRequest, { RequestOptionsType } from './BaseRequest';

type RequestConstructor<TRequest, TResponse> = new () => BaseRequest<
    TRequest,
    TResponse
>;

class RequestBuilder {
    static instance = new AxiosClientApiEndpoint({
        baseURL: 'https://api.open-meteo.com/v1',
        timeout: 10000,
    });

    static getType<RequestDataType, ResponseDataType>(
        options: RequestOptionsType,
    ): RequestConstructor<RequestDataType, ResponseDataType> {
        return class extends BaseRequest<RequestDataType, ResponseDataType> {
            constructor() {
                // Pass the instance and the provided options to the BaseRequest constructor
                super(RequestBuilder.instance, options);
            }
        };
    }
}

export default RequestBuilder;
