import { FormContext } from '@/store/formStore/FormContext';
import { FormStore } from '@/store/formStore/FormStore';

/**
    * Form Provider for UI-forms.
 */

export interface FormProviderProps<T extends Record<string, any>> {
    children: React.ReactNode;
    form: FormStore<T>;
}

export const Provider: React.FC<FormProviderProps<any>> = ({
    children,
    form,
}) => {
    return (
        <FormContext.Provider value={form}>
            {children}
        </FormContext.Provider>
    );
};

export default Provider;
