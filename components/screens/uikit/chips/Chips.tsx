import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import UiSection from "../UiSection";
import { ChipVariantType, SizeVariantType } from "@/components/ui/chip/Chip";

const variants: ChipVariantType[] = ["solid", "outline", "ghost"];
const sizies: SizeVariantType[] = ["sm", "md", "lg"] as SizeVariantType[];

const Chips: React.FC = () => {
    return (
        <UiSection header="Chips">
            <UI.YStack gap="$4">
                {variants.map((variant) => (
                    <UI.YStack key={variant} gap="$2">
                        <UI.XStack gap="$2" flexWrap="wrap">
                            {sizies.map((size, i) => (
                                <UI.Chip
                                    key={`${variant}-${size}-${i}`}
                                    id={`${variant}-${size}-${i}`}
                                    label={<UI.Typo.Text>{`${variant} ${size}`}</UI.Typo.Text>}
                                    counter={i.toString()}
                                    variant={variant}
                                    size={size}
                                    // icon={<Eye size={16}/>}
                                />
                            ))}
                        </UI.XStack>
                    </UI.YStack>
                ))}
            </UI.YStack>
        </UiSection>
    );
};

export default observer(Chips);