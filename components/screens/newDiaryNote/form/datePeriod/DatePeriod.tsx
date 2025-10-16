import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@/components/ui";
import Form from "@/form";

const DatePeriod: React.FC = () => {
    return (
        <UI.Paper>
            <Form.Field
                name='date'
                component={UI.DatePicker}
            />
        </UI.Paper>
    );
};

export default observer(DatePeriod);

