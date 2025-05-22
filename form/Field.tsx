import YStack from '@/components/ui/stack/YStack';
import Typo from '@/components/ui/typo/Typo';
import { useFormContext } from '@/store/formStore/FormContext';
import { observer } from 'mobx-react-lite';

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

const Field = observer(<
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

    const disabled = form.disabled[name];

    const componentProps = {
        [valueProp]: value,
        onValueChange: handler,
        disabled: disabled,
        ...rest,
    };

    const touched = form.touched[name];
    const hasError = form.errors[name];

    return (
        <YStack gap='$2'>
            <Component {...componentProps} />
            {touched && hasError ? (
                <Typo.Text fontSize={'$1'} color='$red9'>{form.errors[name]}</Typo.Text>
            ) : null}
        </YStack>
    );
});

export default Field;