import React from "react";
import { observer } from "mobx-react-lite";
import { RefreshControl, ScrollView } from "react-native";
import { View } from "tamagui";
import useAppContext from "@hooks/useAppContext";
import UI from "@shared/components/ui";
import CurrentWeatherStatus from "./components/commonWeatherStatus/CommonWeatherStatus";
import HourlyForecast from "./components/hourlyForecast/HourlyForecast";
import DailyForecast from "./components/dailyForecast/DailyForecast";
import { useWeatherData } from "./hooks/useWeatherData";
import { useLocationPermission } from "./hooks/useLocationPermission";
import AccessDenied from "@shared/components/accessDenied/AccessDenied";

const Weather = observer(() => {
    const appStore = useAppContext();

    const {
        permissionStatus,
        isPermissionLoading
    } = useLocationPermission();

    const {
        isLoading,
        refreshing,
        handleRefresh,
        error
    } = useWeatherData({
        currentLocation: appStore.weather.weatherSettings.currentLocation,
        enabled: permissionStatus === "granted",
    });

    if (permissionStatus === "denied") {
        return <AccessDenied permission="geolocation" />;
    }

    if (isPermissionLoading || isLoading) {
        return (
            <UI.ScreenWrapper Component={View}>
                <UI.Loader isLoading size="large" />
            </UI.ScreenWrapper>
        );
    }

    // TODO: resources and errors
    if (error) {
        return (
            <UI.FallbackMessage
                header={"Hmm, something wrong..."}
                description={"I can't to load the data. Please try again later"}
                actions={[{
                    onPress: handleRefresh,
                    children: "Refresh",
                }]}
            />
        );
    }

    return (
        <UI.ScreenWrapper
            Component={ScrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >
            <UI.YStack gap="$3">
                <CurrentWeatherStatus />
                <HourlyForecast />
                <DailyForecast />
            </UI.YStack>
        </UI.ScreenWrapper>
    );
});

export default Weather;