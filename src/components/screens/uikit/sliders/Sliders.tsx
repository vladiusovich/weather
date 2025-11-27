import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@components/ui";
import UiSection from "../UiSection";

const Sliders: React.FC = () => {
    return (
        <UiSection header="Sliders">
            <UI.Slider
                size='$2'
                orientation='horizontal'
                min={0}
                max={10}
                step={1}
            />
        </UiSection>
    );
};

export default observer(Sliders);