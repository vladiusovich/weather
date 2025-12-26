import React from "react";
import { observer } from "mobx-react-lite";
import UI from "src/shared/components/ui";
import UiSection from "../UiSection";

const TextAreas: React.FC = () => {
    return (
        <UiSection header="TextArea">
            <UI.TextArea
                placeholder='Type comment here if you want...'
                maxLength={150}
            />
        </UiSection>
    );
};

export default observer(TextAreas);