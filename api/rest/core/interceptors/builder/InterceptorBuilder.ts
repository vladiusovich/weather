import AppStoreType from "../../../../store/AppStoreType";
import Interceptor, { InterceptorFuncType } from "./Interceptor";

class InterceptorBuilder {
    private fulfilledInterceptors: InterceptorFuncType[] = [];
    private rejectedInterceptors: InterceptorFuncType[] = [];

    constructor(private store: AppStoreType) { }

    public addFulfilled = (callback: InterceptorFuncType) => {
        this.fulfilledInterceptors.push(callback);
        return this;
    };

    public addRejected = (callback: InterceptorFuncType) => {
        this.rejectedInterceptors.push(callback);
        return this;
    };

    public build = () => {
        this.fulfilledInterceptors.reverse();
        this.rejectedInterceptors.reverse();

        return new Interceptor(this.store, this.fulfilledInterceptors, this.rejectedInterceptors);
    }
}

export default InterceptorBuilder;