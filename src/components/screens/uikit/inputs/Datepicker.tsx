import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import UI from "@components/ui";
import UiSection from "../UiSection";

const Datepicker: React.FC = () => {
    const [value, setValue] = useState<string>();

    return (
        <UiSection header="Datapicker">
            <UI.YStack gap="$2">
                <UI.DatePicker value={value} onValueChange={(val) => setValue(val)}/>
            </UI.YStack>
        </UiSection>
    );
};

export default observer(Datepicker);