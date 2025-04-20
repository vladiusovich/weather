import UI from '@/components/ui';
import { useFormContext } from '@/store/formStore/FormContext';
import { observer } from 'mobx-react-lite';
import { ButtonProps } from 'tamagui';

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

export default Button;
