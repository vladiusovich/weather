import React, { createContext, useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import { FormStore } from './FormStore';

/**
 * Контекст для передачи FormStore без пропсов.
 */
const FormContext = createContext<FormStore<any> | null>(null);

/**
 * Провайдер формы для обёртки всего UI-формы.
 */
export const FormProvider = <T extends Record<string, any>>({
    form,
    children,
}: {
    form: FormStore<T>;
    children: ReactNode;
}) => {
    return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}

/**
 * Хук для получения FormStore из контекста.
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
 * Универсальная обёртка для любого компонента, привязанного к форме.
 * Принимает имя поля, компонент и имена пропсов для value/change.
 */
interface FieldProps<T extends Record<string, any>, K extends keyof T> {
    /** Ключ поля в FormStore */
    name: K;
    /** Компонент ввода (TextInput, Slider, DateTimePicker и т.д.) */
    component: React.ComponentType<any>;
    /** Имя пропса для значения компонента, по умолчанию 'value' */
    valueProp?: string;
    /** Имя пропса для обработчика изменения, по умолчанию будет определено автоматически */
    changeProp?: string;
    /** Дополнительные пропсы для переданного компонента */
    [prop: string]: any;
}

export const Field = observer(<T extends Record<string, any>, K extends keyof T>(
    props: FieldProps<T, K>
) => {
    const { name, component: Component, valueProp = 'value', changeProp, ...rest } = props as any;
    const form = useFormContext<T>();
    const value = form.getValue(name);

    // Функция-обработчик: для DateTimePicker (onChange event) может быть двухаргументной
    const handler = (...args: any[]) => {
        // Если второй аргумент определен, используем его (для DateTimePicker)
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
