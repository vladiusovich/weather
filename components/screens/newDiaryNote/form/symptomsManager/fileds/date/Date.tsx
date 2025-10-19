import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@/components/ui";
import Form from "@/form";

const Date: React.FC = () => {
    return (
        <Form.Field
            name='date'
            component={UI.DatePicker}
        />
    );
};

export default observer(Date);

