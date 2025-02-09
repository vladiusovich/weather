import { useEffect } from "react";
import { BackHandler } from "react-native";

type Params = {
    backAction: () => void;
    state: boolean;
}

const useBackHandler = (params: Params) => {
    useEffect(() => {
        const backAction = () => {
            if (params.state) {
                params.backAction();

                // Prevent default behavior (exit app)
                return true;
            }

            // Allow default behavior
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [params]);
};

export default useBackHandler;
