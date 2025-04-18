import React, { createContext, useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { FormStore } from './FormStore';
import UI from '@/components/ui';
import { ButtonProps } from 'tamagui';

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
        <UI.YStack gap='$3'>
            <Component {...componentProps} />
            {form.touched[name] && form.errors[name] ? (
                <UI.Typo.Text color='$red9'>{form.errors[name]}</UI.Typo.Text>
            ) : null}
        </UI.YStack>
    );
});


/**
    * A generic wrapper for Submit button attached to a form.
 */

type SubmitButtonProps = ButtonProps;

export const Button = observer(<
    T extends Record<string, any>>(props: SubmitButtonProps) => {
    const form = useFormContext<T>();

    const handler = async () => {
        await form.handleSubmit();
    };

    const hasError = form.hasError;

    return (
        <UI.Button
            {...props}
            disabled={hasError}
            onPress={handler}
        />
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
