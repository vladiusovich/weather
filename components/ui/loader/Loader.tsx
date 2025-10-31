import React from "react";
import { Spinner, SpinnerProps } from "tamagui";
import YStack from "../stack/YStack";
import FullScreenLoader from "./FullScreenLoader";

export interface LoaderProps extends SpinnerProps {
    isLoading: boolean;
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    isLoading = false,
    fullScreen = false,
    ...props
}) => {
    if (!isLoading) return null;

    if (fullScreen) {
        return <FullScreenLoader {...props} />;
    }

    return (
        <YStack
            flex={1}
            justify='center'
            items='center'
        >
            <Spinner
                {...props}
            />
        </YStack>
    );
};

export default Loader;
