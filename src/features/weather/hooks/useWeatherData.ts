import { useCallback, useEffect, useState } from "react";
import useAppContext from "@hooks/useAppContext";
import useRefreshController from "@hooks/useRefreshController";
import { LocationCoords } from "@appTypes/LocationCoords";

interface UseWeatherDataOptions {
    currentLocation: LocationCoords | null | undefined;
    enabled: boolean;
}

interface UseWeatherDataReturn {
    isLoading: boolean;
    refreshing: boolean;
    handleRefresh: () => Promise<void>;
    error: string | null;
}

export const useWeatherData = ({
    currentLocation,
    enabled,
}: UseWeatherDataOptions): UseWeatherDataReturn => {
    const appStore = useAppContext();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = useCallback(
        async (location: LocationCoords) => {
            try {
                setError(null);

                const results = await Promise.allSettled([
                    appStore.weather.weatherData.fetch(location),
                    appStore.weather.geoMagneticStore.fetch(),
                ]);

                const failedRequests = results.filter(
                    (result) => result.status === "rejected"
                );

                if (failedRequests.length === results.length) {
                    throw new Error("Cant get data");
                }
            } catch (err) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Error";
                setError(errorMessage);
                console.error("Weather fetch error:", err);
            }
        },
        [appStore.weather.weatherData, appStore.weather.geoMagneticStore]
    );

    const { refreshing, handleRefresh } = useRefreshController(async () => {
        if (currentLocation) {
            await fetchWeather(currentLocation);
        }
    });

    useEffect(() => {
        const loadInitialData = async () => {
            if (!enabled || !currentLocation) {
                setIsInitialLoading(false);
                return;
            }

            setIsInitialLoading(true);
            await fetchWeather(currentLocation);
            setIsInitialLoading(false);
        };

        loadInitialData();
    }, [enabled, currentLocation, fetchWeather]);

    const isLoading =
        isInitialLoading &&
        !appStore.weather.weatherData?.current;

    return {
        isLoading,
        refreshing,
        handleRefresh,
        error,
    };
};