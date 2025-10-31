import React from "react";
import { Spinner, SpinnerProps, YStack } from "tamagui";

type FullScreenLoaderProps = SpinnerProps;

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ ...props }) => {

    return (
        <YStack
            position="absolute"
            t={0}
            l={0}
            r={0}
            b={0}
            bg="$background02"
            items="center"
            justify="center"
            z={9999}
            pointerEvents="auto"
        >
            <YStack
                p="$4"
                rounded="$4"
                bg="$color1"
                items="center"
                justify="center"
                gap="$2"
            >
                <Spinner size="large" {...props} />
            </YStack>
        </YStack>
    );
};

export default FullScreenLoader;
