import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { RefreshControl, ScrollView } from "react-native";
import * as Location from "expo-location";
import useAppStore from "@hooks/useAppStore";
import UI from "@shared/components/ui";
import AccessDeniedStatic from "../../shared/components/accessDeniedStatic/AccessDeniedStatic";
import { LocationCoords } from "@appTypes/LocationCoords";
import CurrentWeatherStatus from "./commonWeatherStatus/CommonWeatherStatus";
import HourlyForecast from "./hourlyForecast/HourlyForecast";
import DailyForecast from "./dailyForecast/DailyForecast";
import useRefreshController from "@hooks/useRefreshController";
import { View } from "tamagui";

// TODO: refactoring the module
const Weather = () => {
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

            const { coords } = await Location.getCurrentPositionAsync();

            appStore.weather.weatherSettings.saveLocation(coords);
            await fetchWeather(coords);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isLoading = !appStore.weather.weatherData?.current;

    if (status?.status === "denied") {
        return <AccessDeniedStatic permission="geolocation" />;
    };

    if (isLoading) {
        return (
            <UI.ScreenWrapper
                Component={View}
            >
                <UI.Loader isLoading={isLoading} size="large" />
            </UI.ScreenWrapper>
        );
    }

    return (
        <UI.ScreenWrapper
            Component={ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <UI.Loader isLoading={isLoading} />
            {!isLoading && (
                <UI.YStack gap='$3'>
                    {/* <LocationStatus /> */}
                    <CurrentWeatherStatus />
                    <HourlyForecast />
                    <DailyForecast />
                </UI.YStack>
            )}
        </UI.ScreenWrapper>
    );
};

export default observer(Weather);