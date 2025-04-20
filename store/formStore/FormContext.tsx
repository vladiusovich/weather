import { createContext, useContext } from 'react';
import { FormStore } from './FormStore';

/**
    * Context for FormStore.
 */
export const FormContext = createContext<FormStore<any> | null>(null);

/**
    * Hook get FormStore from context.
 */
export function useFormContext<Fields extends Record<string, unknown>>(): FormStore<Fields>;
export function useFormContext<Store extends FormStore<any>>(): Store;

export function useFormContext() {
    const form = useContext(FormContext);
    if (!form) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return form;
}
