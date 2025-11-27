import Button from "@components/ui/button/Button";
import { useFormContext } from "@store/formStore/FormContext";
import { observer } from "mobx-react-lite";
import { ButtonProps } from "tamagui";

/**
    * A generic wrapper for Submit button attached to a form.
 */

type SubmitButtonProps = ButtonProps;

export const Submit = observer(<
    T extends Record<string, any>>(props: SubmitButtonProps) => {
    const form = useFormContext<T>();

    const handler = async () => {
        await form.handleSubmit();
    };

    const hasError = form.hasError;

    return (
        <Button
            {...props}
            disabled={hasError}
            onPress={handler}
        />
    );
});

export default Submit;
