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
            items="center"
            justify="center"
            // bg={"$background"}
            // opacity={0.1}
            pointerEvents="auto"
            z={1}
        >
            <Spinner size="large" color={"$accentColor"} {...props} />
        </YStack>
    );
};

export default FullScreenLoader;
