import React from "react";
import { observer } from "mobx-react-lite";
import UI from "@components/ui";
import { ChevronRight, Cloud, Moon, Star, Sun } from "@tamagui/lucide-icons";
import UiSection from "../UiSection";

const List: React.FC = () => {
    return (
        <UiSection header="List" >
            <UI.List items={[{
                icon: Star,
                title: "Star",
                subTitle: "Twinkles",
                iconAfter: ChevronRight
            },
            {
                icon: Cloud,
                title: "Cloud",
            },
            {
                title: "Star",
                subTitle: "Twinkles"
            },
            {
                icon: Moon,
                title: "Moon",
            },
            {
                icon: Sun,
                title: "Sun",
                subTitle: "Sun"
            },
            {
                icon: Star,
                title: "Star",
                subTitle: "Twinkles"
            }]}
            />
        </UiSection>
    );
};

export default observer(List);