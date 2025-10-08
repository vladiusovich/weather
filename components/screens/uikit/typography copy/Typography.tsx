import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import UiSection from "../UiSection";

const typo = Object.keys(UI.Typo);
type TypoKey = keyof typeof UI.Typo;

const Typography: React.FC = () => {
    const components = (typo as TypoKey[]).map((t) => {
        const C = UI.Typo[t];
        return <C key={t}>{t}</C>;
    });

    return (
        <UiSection header="Typography" >
            {components}
        </UiSection>
    );
};

export default observer(Typography);