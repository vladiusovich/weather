
export interface DailyMeteoData {
    time: string[];
    weatherCode: number[];
    precipitationProbabilityMean: number[];
    temperature2mMax: number[];
    temperature2mMin: number[];
    sunrise?: string[];
    sunset?: string[];
    daylightDuration?: number[];
};
