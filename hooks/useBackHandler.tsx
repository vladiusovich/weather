import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (callback?: () => void) => {
    useEffect(() => {
        const backAction = () => {
            callback?.();
            // Prevent default behavior (exit app)
            return true;


            // if (callback) {
            //     callback?.();
            //     // Prevent default behavior (exit app)
            //     return true;
            // }

            // // Allow default behavior
            // return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [callback]);
};

export default useBackHandler;
