import React from "react";
import { Spinner, SpinnerProps } from "tamagui";
import YStack from "../stack/YStack";

interface LoaderProps extends SpinnerProps {
    isloading: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    isloading = false,
    size = "large",
    color = "$green10",
    ...props
}) => {
    if (!isloading) return null;

    return (
        <YStack
            flex={1}
            justify='center'
            items='center'
        >
            <Spinner
                {...props}
                size={size}
                color={color}
            />
        </YStack>
    );
};

export default Loader;
