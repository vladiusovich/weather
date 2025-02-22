import AppStoreType from "../../../../store/AppStoreType";

export type InterceptorFuncType = (value: any, store?: AppStoreType) => void;

class Interceptor {
    constructor(
        private store: AppStoreType,
        private fulfilledInterceptors: InterceptorFuncType[],
        private rejectedInterceptors: InterceptorFuncType[],
    ) { }

    public onFulfilled = async (value: any) => {
        this.fulfilledInterceptors.forEach((callback) => {
            callback(value, this.store);
        });

        return Promise.resolve(value);
    }

    public onRejected = async (error: any) => {
        const errors = this.rejectedInterceptors.map((callback) => {
            return callback(error, this.store);
        });

        const prolongError = errors.find((error) => error !== undefined);

        // If any of the interceptors prolongs the error, return it
        if (prolongError) {
            return Promise.resolve(prolongError);
        }

        return;
    }
}

export default Interceptor;