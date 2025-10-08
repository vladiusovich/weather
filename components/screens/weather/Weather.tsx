import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RefreshControl, ScrollView } from "react-native";
import * as Location from "expo-location";
import useAppStore from "@/hooks/useAppStore";
import UI from "@/components/ui";
import AccessDenied from "../../common/accessDenied/AccessDenied";
import { LocationCoords } from "@/types/LocationCoords";
import CurrentWeatherStatus from "./currentWeatherStatus/CurrentWeatherStatus";
import HourlyForecast from "./hourlyForecast/HourlyForecast";
import DailyForecast from "./dailyForecast/DailyForecast";
import useRefreshController from "@/hooks/useRefreshController";

// TODO: refactoring the module
const Weather = observer(() => {
    const appStore = useAppStore();
    const [status, requestPermission] = Location.useForegroundPermissions();

    const fetchWeather = useCallback(async (location: LocationCoords) => {
        if (location) {
            await Promise.allSettled([
                appStore.weather.weatherData.fetch(location),
                appStore.weather.geoMagneticStore.fetch(),
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { refreshing, handleRefresh } = useRefreshController(async () => {
        await fetchWeather(appStore.weather.weatherSettings.currentLocation!);
    });

    useEffect(() => {
        (async () => {
            if (status?.status !== "granted") {
                const result = await requestPermission();
                if (!result.granted) {
                    return;
                }
            }

            const location = await Location.getCurrentPositionAsync();
            const { coords } = location;

            appStore.weather.weatherSettings.saveLocation(coords);
            await fetchWeather(coords);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isLoading = !appStore.weather.weatherData?.current;

    if (status === null) return null;

    if (status.status === "denied") {
        return <AccessDenied type='geolocation' />;
    };

    return (
        <UI.ScreenWrapper
            Component={ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <UI.Loader isLoading={isLoading} />
            {!isLoading && (
                <UI.YStack gap='$2'>
                    {/* <LocationStatus /> */}
                    <CurrentWeatherStatus />
                    <HourlyForecast />
                    <DailyForecast />
                </UI.YStack>
            )}
        </UI.ScreenWrapper>
    );
});

export default Weather;