import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";

interface BlockProps {
    header: string;
    children: React.ReactNode;
}

const UiSection: React.FC<BlockProps> = (({
    header,
    children,
}) => {
    return (
        <UI.Paper>
            <UI.YStack gap={"$2"}>
                <UI.Typo.H6>
                    {header}
                </UI.Typo.H6>
                {children}
            </UI.YStack>
        </UI.Paper>
    );
});

export default observer(UiSection);