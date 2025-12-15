import Button, { IMnButtonProps } from "@components/ui/button/Button";
import { useFormContext } from "@store/formStore/FormContext";
import { observer } from "mobx-react-lite";

/**
    * A generic wrapper for Submit button attached to a form.
 */

type SubmitButtonProps = IMnButtonProps;

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
