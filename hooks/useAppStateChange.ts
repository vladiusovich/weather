import { useState, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

const useAppStateChange = (onChange: (newState: AppStateStatus) => Promise<void>): AppStateStatus => {
    const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", async (nextState: AppStateStatus) => {
            setAppState(nextState);
            await onChange(nextState);
        });

        return () => {
            subscription.remove();
        };
    }, [onChange]);

    return appState;
};

export default useAppStateChange;
