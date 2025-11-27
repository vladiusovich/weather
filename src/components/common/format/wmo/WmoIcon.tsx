import React from "react";
import type { IconProps } from "@tamagui/helpers-icon";
import {
    Sun,
    Cloudy,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    CloudSnow,
    CloudLightning
} from "@tamagui/lucide-icons";

const iconMapper: Record<number, typeof Sun> = {
    0: Sun,                      // Clear sky
    1: Cloudy,                    // Partly cloudy/Overcast
    2: Cloudy,                    // Partly cloudy/Overcast
    3: Cloudy,                    // Partly cloudy/Overcast
    45: CloudFog,                // Fog/Rime fog
    48: CloudFog,                // Fog/Rime fog
    51: CloudDrizzle,            // Light drizzle
    53: CloudDrizzle,            // Moderate drizzle
    55: CloudDrizzle,            // Dense drizzle
    56: CloudDrizzle,            // Light freezing drizzle
    57: CloudDrizzle,            // Dense freezing drizzle
    61: CloudRain,               // Light rain
    63: CloudRain,               // Moderate rain
    65: CloudRain,               // Heavy rain
    66: CloudRain,               // Light freezing rain
    67: CloudRain,               // Heavy freezing rain
    71: CloudSnow,               // Light snow
    73: CloudSnow,               // Moderate snow
    75: CloudSnow,               // Heavy snow
    77: CloudSnow,               // Snow grains
    80: CloudRain,               // Light rain showers
    81: CloudRain,               // Moderate rain showers
    82: CloudRain,               // Violent rain showers
    85: CloudSnow,               // Light snow showers
    86: CloudSnow,               // Heavy snow showers
    95: CloudLightning,          // Thunderstorm
    96: CloudLightning,          // Thunderstorm with light hail
    99: CloudLightning,          // Thunderstorm with heavy hail
};

type WmoCodeProps = {
    value?: number | null;
} & IconProps;

const WmoIcon: React.FC<WmoCodeProps> = ({
    value,
    ...props
}) => {
    if (value == null) return null;

    const Icon = iconMapper[value];
    if (!Icon) return null;

    return <Icon {...props} />;
};

export default WmoIcon;
