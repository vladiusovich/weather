import React, { createContext, useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import { FormStore } from './FormStore';

/**
    * Context for FormStore.
 */
const FormContext = createContext<FormStore<any> | null>(null);

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

/**
    * A generic wrapper for any component attached to a form.
    * Accepts a field name, component, and prop names for value/change.
 */
type FieldProps<
    T extends Record<string, any>,
    K extends keyof T,
    C extends React.ComponentType<any> = React.ComponentType<any>
> = {
    /** Field key in FormStore */
    name: K;
    /** Input component (TextInput, Slider, DateTimePicker, etc) */
    component: C;
} & Omit<
    React.ComponentProps<C>,
    | 'value'
    | 'onChange'
    | 'onValueChange'
>;

export const Field = observer(<
    T extends Record<string, any>,
    K extends keyof T,
    C extends React.ComponentType<any> = React.ComponentType<any>
>(props: FieldProps<T, K, C>) => {
    const { name, component: Component, valueProp = 'value', changeProp, ...rest } = props as any;
    const form = useFormContext<T>();
    const value = form.getValue(name);

    const handler = (...args: any[]) => {
        const newValue = args[0];
        form.setValue(name, newValue);
    };

    // Автовыбор пропа для изменения, если не указан
    const defaultChangeProp =
        changeProp ||
        (value as any instanceof Date
            ? 'onChange'
            : 'onValueChange'
        );

    const componentProps = {
        [valueProp]: value,
        [defaultChangeProp]: handler,
        ...rest,
    };

    return (
        <View>
            <Component {...componentProps} />
            {form.touched[name] && form.errors[name] ? (
                <Text style={{ color: 'red', marginTop: 4 }}>{form.errors[name]}</Text>
            ) : null}
        </View>
    );
});

/**
    * Form Provider for UI-forms.
 */
export const Provider = <T extends Record<string, any>>({
    form,
    children,
}: {
    form: FormStore<T>;
    children: ReactNode;
}) => {
    return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}
