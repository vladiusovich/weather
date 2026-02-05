import React from "react";
import Button, { ButtonProps } from "../button/Button";
import Typo from "../typo/Typo";
import YStack from "../stack/YStack";
import { XStackProps, ZStackProps } from "tamagui";

// TODO
type Variant = "warn" | "error" | "neutral";

export interface FallbackMessageProps {
    header: string | React.ReactNode;
    description: string | React.ReactNode;
    actions?: ButtonProps[];
    variant?: Variant;
    icon?: React.ReactNode;
    actionsPositionProps?: XStackProps | ZStackProps;
}

const FallbackMessage: React.FC<FallbackMessageProps> = ({
    header,
    description,
    actions = [],
    icon,
    actionsPositionProps,
}) => {
    return (
        <YStack justify='center' flex={1}>
            <YStack gap='$3' items='center'>
                {icon}

                <Typo.H4>
                    {header}
                </Typo.H4>

                <Typo.Text>
                    {description}
                </Typo.Text>

                {actions.length > 0 && (
                    <YStack gap='$2' items='center'{...actionsPositionProps} >
                        {actions.map((a, i) => <Button key={i} {...a} />)}
                    </YStack>
                )}
            </YStack>
        </YStack>
    );
};

export default FallbackMessage;
