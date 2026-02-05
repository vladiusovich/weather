import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import useAppContext from "@hooks/useAppContext";

type PermissionStatus = "granted" | "denied" | "undetermined";

interface UseLocationPermissionReturn {
    permissionStatus: PermissionStatus;
    isPermissionLoading: boolean;
    requestPermission: () => Promise<void>;
}

export const useLocationPermission = (): UseLocationPermissionReturn => {
    const appStore = useAppContext();
    const [status, requestExpoPermission] = Location.useForegroundPermissions();
    const [isLoading, setIsLoading] = useState(true);

    const getPermissionStatus = useCallback((): PermissionStatus => {
        if (!status) return "undetermined";

        switch (status.status) {
            case "granted":
                return "granted";
            case "denied":
                return "denied";
            default:
                return "undetermined";
        }
    }, [status]);

    const requestPermission = useCallback(async () => {
        try {
            const result = await requestExpoPermission();

            if (result.granted) {
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
                appStore.weather.weatherSettings.saveLocation(location.coords);
            }
        } catch (error) {
            console.error("Failed to get location permission:", error);
        }
    }, [requestExpoPermission, appStore.weather.weatherSettings]);

    useEffect(() => {
        const initializePermission = async () => {
            setIsLoading(true);

            try {
                if (status?.status === "granted") {
                    const location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });
                    appStore.weather.weatherSettings.saveLocation(location.coords);
                } else if (status?.status === "undetermined") {
                    await requestPermission();
                }
            } catch (error) {
                console.error("Failed to initialize location:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializePermission();
    }, [status?.status, requestPermission, appStore.weather.weatherSettings]);

    return {
        permissionStatus: getPermissionStatus(),
        isPermissionLoading: isLoading,
        requestPermission,
    };
};