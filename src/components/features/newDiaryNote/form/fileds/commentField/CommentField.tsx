import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@shared/components/ui";
import Form from "@form/index";
import { useTranslation } from "react-i18next";

const CommentField: React.FC = () => {
    const { t } = useTranslation();

    return (
        <UI.YStack
            gap='$2'
        >
            <Form.Field
                component={UI.TextArea}
                name='comment'
                placeholder={t("screens.newDiaryNote.fields.comment.placeholder")}
                maxLength={150}
            />
        </UI.YStack>
    );
};

export default observer(CommentField);
