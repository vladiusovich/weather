import { CurrentMeteoData } from "./CurrentMeteoData";
import { DailyMeteoData } from "./DailyMeteoData";
import { HourlyMeteoData } from "./HourlyMeteoData";
import { CurrentMeteoUnitsData, DailyMeteoUnitsData, HourlyMeteoUnitsData } from "./MeteoUnitsData";

export interface MeteoData {
    latitude: number;
    longitude: number;

    current?: CurrentMeteoData;
    hourly?: HourlyMeteoData;
    daily?: DailyMeteoData;

    currentUnits?: CurrentMeteoUnitsData;
    dailyUnits?: DailyMeteoUnitsData;
    hourlyUnits?: HourlyMeteoUnitsData;

    timezone?: string;
};
