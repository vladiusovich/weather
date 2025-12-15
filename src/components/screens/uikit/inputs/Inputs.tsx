import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import UI from "@components/ui";
import UiSection from "../UiSection";
import { Eye, User2 } from "@tamagui/lucide-icons";

const Inputs: React.FC = () => {
    const [val, setVal] = useState("");

    return (
        <UiSection header="Inputs">
            <UI.YStack gap="$4">
                <UI.Searchbar
                    value={val}
                    onValueChange={(text: string) => setVal(text)}
                    placeholder="Searchbar"
                />

                <UI.Input />
                <UI.Input iconLeft={User2} bg={"$green4"} />
                <UI.Input iconRight={Eye} />
                <UI.Input placeholder="Placeholder" />
                <UI.Input placeholder="Placeholder" error />
                <UI.Input />
            </UI.YStack>
        </UiSection>
    );
};

export default observer(Inputs);