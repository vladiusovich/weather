import { useState } from 'react';
import useAppStore from './useAppStore';
import { useTranslation } from 'react-i18next';
import AppStoreType from '@/store/AppStoreType';
import { TFunction } from 'i18next';

type Constructor<T, Args extends unknown[] = any[]> =
    new (store: AppStoreType, t: TFunction, ...args: Args) => T;

export const useCreateForm = <T, Args extends unknown[]>(
    FormClass: Constructor<T, Args>,
    ...args: Args
): T => {
    const appStore = useAppStore();
    const { t } = useTranslation();
    const [form] = useState<T>(() => new FormClass(appStore, t, ...args));
    return form;
};

export default useCreateForm;
