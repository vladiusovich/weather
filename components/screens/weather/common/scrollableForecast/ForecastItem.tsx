import UI from "@/components/ui";
import { observer } from "mobx-react-lite";
import React from "react";

interface ForecastItemProps {
    children: React.ReactNode;
    current?: boolean;
}

const ForecastItem: React.FC<ForecastItemProps> = ({
    children,
    current,
}) => {
    return (
        <UI.View
            flex={1}
            bg={current ? "$background08" : "$background02"}
            rounded={40}
            px={16}
            py={16}
        >
            <UI.YStack
                justify='space-around'
                items='center'
                flex={1}
                gap='$2'
            >
                {children}
            </UI.YStack>
        </UI.View>
    );
};

export default observer(ForecastItem);
