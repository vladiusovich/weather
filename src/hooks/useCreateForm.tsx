import { useState } from "react";
import useAppContext from "./useAppContext";
import { useTranslation } from "react-i18next";
import AppStoreType from "src/appStore/AppStoreType";
import { TFunction } from "i18next";

type Constructor<T, Args extends unknown[] = any[]> =
    new (store: AppStoreType, t: TFunction, ...args: Args) => T;

export const useCreateForm = <T, Args extends unknown[]>(
    FormClass: Constructor<T, Args>,
    ...args: Args
): T => {
    const appStore = useAppContext();
    const { t } = useTranslation();
    const [form] = useState<T>(() => new FormClass(appStore, t, ...args));
    return form;
};

export default useCreateForm;
