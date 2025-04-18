import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Custom hook to handle the Android hardware back button behavior.
 *
 * @param condition - If true, the custom back handler will be triggered.
 * @param callback - Optional function to run when the back button is pressed and the condition is met.
 */
const useBackHandler = (condition: boolean, callback?: () => void) => {
    useEffect(() => {
        // Function that will be called on hardware back button press
        const onHardwareBackPress = () => {
            if (condition ?? callback) {
                callback?.();
                // Prevent default behavior (exit app)
                return true;
            }

            // Allow default behavior
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onHardwareBackPress,
        );

        return () => backHandler.remove();
    }, [callback, condition]);
};

export default useBackHandler;
