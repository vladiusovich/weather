import { observer } from "mobx-react-lite";
import React from "react";
import UI from "src/shared/components/ui";
import Form from "src/core/form/index";

const Date: React.FC = () => {
    return (
        <Form.Field
            component={UI.DatePicker}
            name='date'
            size={"$5"}
            scaleIcon={1.4}
            bg={"$background06"}
        />
    );
};

export default observer(Date);

