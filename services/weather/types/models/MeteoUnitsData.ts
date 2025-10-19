import { CurrentMeteoData } from "./CurrentMeteoData";
import { DailyMeteoData } from "./DailyMeteoData";
import { HourlyMeteoData } from "./HourlyMeteoData";

type CurrentMeteoDataKeys = keyof CurrentMeteoData;
type HourlyMeteoDataKeys = keyof HourlyMeteoData;
type DailyMeteoDataKeys = keyof DailyMeteoData;

export type CurrentMeteoUnitsData = Partial<Record<CurrentMeteoDataKeys, string>>;

export type HourlyMeteoUnitsData = Partial<Record<HourlyMeteoDataKeys, string>>;

export type DailyMeteoUnitsData = Partial<Record<DailyMeteoDataKeys, string>>;
