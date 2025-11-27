import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@components/ui";
import Form from "@form/index";

const CommentField: React.FC = () => {
    return (
        <UI.YStack
            gap='$2'
        >
            <Form.Field
                component={UI.TextArea}
                name='comment'
                placeholder='Type comment here if you want...'
                maxLength={150}
            />
        </UI.YStack>
    );
};

export default observer(CommentField);
