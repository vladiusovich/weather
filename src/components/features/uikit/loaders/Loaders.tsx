import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@shared/components/ui";
import UiSection from "../UiSection";
import { ColorTokens } from "tamagui";

const variants: ColorTokens[] = ["green", "tomato"];
const sizies: ("small" | "large")[] = ["small", "large"];

const Loaders: React.FC = () => {
    return (
        <UiSection header="Loaders">
            <UI.YStack gap="$4">
                {variants.map((color) => (
                    <UI.YStack key={color} gap="$2">
                        <UI.XStack gap="$4" flexWrap="wrap">
                            {sizies.map((size) => (
                                <UI.YStack
                                    key={`${color}-${size}`}
                                    gap="$1"
                                >
                                    <UI.Loader
                                        isLoading
                                        color={`${color}`}
                                        size={size}
                                    />
                                </UI.YStack>
                            ))}
                        </UI.XStack>
                    </UI.YStack>
                ))}
            </UI.YStack>
        </UiSection>
    );
};

export default observer(Loaders);