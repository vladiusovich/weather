import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@/components/ui";
import Form from "@/form";

const CommentField: React.FC = () => {
    return (
        <UI.YStack
            gap='$2'
        >
            <Form.Field
                name='comment'
                component={UI.TextArea}
                placeholder='Type comment here if you want...'
                maxLength={150}
            />
        </UI.YStack>
    );
};

export default observer(CommentField);
