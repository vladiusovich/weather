import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import UiSection from "../UiSection";
import { range } from "@/utils/array.helper";
import { SelectDemo } from "./SelectDemo";

const options = range(1, 25, 1).map((s) => {
    return {
        name: `Label ${s}`,
        value: s.toString(),
    };
});

const Selectors: React.FC = () => {
    return (
        <UiSection header="Selectors">
            <UI.Selector
                name="selectorKit"
                options={options}
                label='Selector label'
            />
            {/* <SelectDemo /> */}
        </UiSection>
    );
};

export default observer(Selectors);