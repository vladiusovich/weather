import { FormStore, FormStoreOptions } from '@/store/formStore/FormStore';
import AppStoreType from '@/store/AppStoreType';
import { TFunction } from 'i18next';

abstract class LocalizedFormStore<T extends Record<string, any>> extends FormStore<T> {
    constructor(protected store: AppStoreType, protected t: TFunction, options?: FormStoreOptions<T>) {
        super(options);
    }
}

export default LocalizedFormStore;