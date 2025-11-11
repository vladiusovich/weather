import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@/components/ui";
import UiSection from "../UiSection";

const backgroundVariants = ["background", "background0", "background02",
    "background04", "background06", "background08"];

const backgroundExtraVariants = ["accentBackground",
    "backgroundFocus", "backgroundHover", "backgroundPress"];

const RecursiveCard = ({ backgrounds, index = 0 }: { backgrounds: string[]; index?: number }) => {
    const b = backgrounds[index];

    if (index >= backgrounds.length) return null;

    return (
        <UI.Paper
            key={b}
            bg={`$${b}` as never}
            p={10}>
            <UI.Typo.Text p={5}>{b}</UI.Typo.Text>
            <RecursiveCard backgrounds={backgrounds} index={index + 1} />
        </UI.Paper>
    );
};

const Colors: React.FC = () => {
    const ExtraBackgrounds = backgroundExtraVariants.map((b) => (
        <UI.Paper
            key={b}
            bg={`$${b}` as never}
            p={10}
        >
            <UI.Typo.Text>
                {b}
            </UI.Typo.Text>
        </UI.Paper>));

    return (
        <UiSection header="Colors">
            <UI.YStack gap={10}>
                <RecursiveCard backgrounds={backgroundVariants} />
                {ExtraBackgrounds}
            </UI.YStack>
        </UiSection>
    );
};

export default observer(Colors);