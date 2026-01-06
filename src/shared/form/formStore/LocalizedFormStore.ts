import AppStoreType from "src/appStore/AppStoreType";
import { TFunction } from "i18next";
import { FormStore, FormStoreOptions } from "./FormStore";

abstract class LocalizedFormStore<T extends Record<string, any>> extends FormStore<T> {
    constructor(protected store: AppStoreType, protected t: TFunction, options?: FormStoreOptions<T>) {
        super(options);
    }
}

export default LocalizedFormStore;