
export interface HourlyMeteoData {
    time: string[];
    weatherCode: number[];
    apparentTemperature: number[];
    temperature2mMax: number[];
    temperature2mMin: number[];
    temperature2m: number[];
    relativeHumidity2m: number[];
    precipitationProbability: number[];
    pressureMsl: number[];
    surfacePressure: number[];
};
