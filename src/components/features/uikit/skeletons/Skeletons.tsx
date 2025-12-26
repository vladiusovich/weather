import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@shared/components/ui";
import UiSection from "../UiSection";

const Skeletons: React.FC = () => {
    return (
        <UiSection header="Skeletons">
            <UI.YStack gap="$2">
                <UI.Skeleton height={16} />
                <UI.Skeleton height={24} />
                <UI.Skeleton height={32} />
                <UI.Skeleton height={64} />
            </UI.YStack>
        </UiSection>
    );
};

export default observer(Skeletons);