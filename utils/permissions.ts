import * as Linking from "expo-linking";
import { Platform } from "react-native";

type PermissionType =
    | "geolocation"
    | "camera"
    | "microphone"
    | "notifications"
    | "bluetooth"
    | "photos"
    | "contacts"
    | "calendar"
    | "unknown";

type PlatformType = "ios" | "android";

type PermissionLinkMap = {
    [key in PermissionType]?: {
        [platform in PlatformType]?: string | (() => Promise<void> | void);
    };
};

const permissionLinks: PermissionLinkMap = {
    geolocation: {
        ios: "app-settings:",
        android: () => Linking.openSettings(),
    },
    camera: {
        ios: "app-settings:",
        android: () => Linking.openSettings(),
    },
    notifications: {
        ios: "app-settings:",
        android: () => Linking.openSettings(),
    },
    unknown: {
        ios: "app-settings:",
        android: () => Linking.openSettings(),
    },
};

export async function openAppPermissionSettings(type: PermissionType = "unknown") {
    const platform: PlatformType = Platform.OS as PlatformType;
    const entry = permissionLinks[type] ?? permissionLinks["unknown"];

    const action = entry?.[platform];

    try {
        if (typeof action === "string") {
            await Linking.openURL(action);
        } else if (typeof action === "function") {
            await action();
        } else {
            // fallback
            await Linking.openSettings();
        }
    } catch (error) {
        console.warn(`Can't open an settings (${type}):`, error);
    }
}
