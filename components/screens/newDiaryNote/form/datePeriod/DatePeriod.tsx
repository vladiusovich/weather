import { observer } from "mobx-react-lite";
import React from "react";
import UI from "@/components/ui";
import Form from "@/form";

const DatePeriod: React.FC = () => {
    return (
        <UI.Paper>
            <UI.Card.Header size={"$0.5"}>
                <UI.YStack gap={"$2"} items='flex-start'>
                    <Form.Field
                        name='date'
                        component={UI.DatePicker}
                    />
                </UI.YStack>
            </UI.Card.Header>
        </UI.Paper>
    );
};

export default observer(DatePeriod);

