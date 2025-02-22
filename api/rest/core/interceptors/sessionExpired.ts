import AppStoreType from "../../../store/AppStoreType";
import { InterceptorFuncType } from "./builder/Interceptor";

export const sessionExpired: InterceptorFuncType = (error: any, store?: AppStoreType) => {
    if (error?.response?.status === 401) {
        console.debug('sessionExpired', error);
        store?.user.auth.logout();
        return;
    }

    return error;
};
