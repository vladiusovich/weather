import { TextArea as UITextArea, TextAreaProps } from "tamagui";

interface TextAreaPropsEx extends Omit<TextAreaProps, "onChangeText"> {
    onValueChange?: () => void;
}

const TextArea: React.FC<TextAreaPropsEx> = ({
    onValueChange,
    ...props
}) => {

    return (
        <UITextArea
            onChangeText={onValueChange}
            borderBlockColor={"transparent"}
            {...props}
        />
    );
};

export default TextArea;
