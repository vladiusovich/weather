import { attachToken } from "./attachToken";
import { sessionExpired } from "./sessionExpired";
import InterceptorBuilder from "./builder/InterceptorBuilder";
import AppStoreType from "../../../store/AppStoreType";

const buildInterceptors = (store: AppStoreType) => {
    // request interceptor
    const requestInterceptorBuilder = new InterceptorBuilder(store);
    requestInterceptorBuilder.addFulfilled(attachToken);

    const requestInterceptor = requestInterceptorBuilder.build();

    // response interceptor
    const responseInterceptorBuilder = new InterceptorBuilder(store);
    responseInterceptorBuilder.addRejected(sessionExpired);

    const responseInterceptor = responseInterceptorBuilder.build();

    return {
        requestInterceptor,
        responseInterceptor,
    };
}

export default buildInterceptors;

