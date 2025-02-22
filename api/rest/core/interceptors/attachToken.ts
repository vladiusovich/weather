import { ACCESS_TOKEN } from "../../../const/authConstans";
import { InterceptorFuncType } from "./builder/Interceptor";

export const attachToken: InterceptorFuncType = (value: any) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
        value.headers['Authorization'] = `Bearer ${token}`;
    }

    return value;
};
