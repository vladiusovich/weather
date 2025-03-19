import GetWeatherRequest from '@/api/rest/openMeteo/GetWeatherRequest';
import { MeteoRequest } from '../MeteoRequest';
import { MeteoResponse } from '../MeteoResponse';
import { MeteoData } from '../models/MeteoData';

class OpenMeteoService {
    private weatherRequest = new GetWeatherRequest();

    public async fetch(request: MeteoRequest): Promise<MeteoData | null> {
        await this.weatherRequest.execute(request);
        return this.mapResponse(this.weatherRequest?.data);
    }

    // eslint-disable-next-line class-methods-use-this
    private mapResponse(response: MeteoResponse | null): MeteoData | null {
        if (!response) {
            return null;
        }

        return {
            latitude: response.latitude,
            longitude: response.longitude,
            timezone: response.timezone,

            current: response.current ? {
                weatherCode: response.current.weather_code ?? 0,
                apparentTemperature: response.current.apparent_temperature ?? 0,
                temperature2mMax: response.current.temperature_2m_max ?? 0,
                temperature2mMin: response.current.temperature_2m_min ?? 0,
                timezone: response.timezone
            } : undefined,

            daily: response.daily ? {
                time: (response.daily.time ?? []) as string[],
                weatherCode: (response.daily.weather_code ?? []) as number[],
                precipitationProbabilityMean: (response.daily.precipitation_probability_mean ?? []) as number[],
                temperature2mMax: (response.daily.temperature_2m_max ?? []) as number[],
                temperature2mMin: (response.daily.temperature_2m_min ?? []) as number[],
                sunrise: (response.daily?.sunrise ?? []) as unknown as string[],
                sunset: (response.daily?.sunset ?? []) as unknown as string[],
            } : undefined,

            hourly: response.hourly ? {
                time: (response.hourly.time ?? []) as string[],
                weatherCode: (response.hourly.weather_code ?? []) as number[],
                apparentTemperature: (response.hourly.apparent_temperature ?? []) as number[],
                temperature2mMax: (response.hourly.temperature_2m_max ?? []) as number[],
                temperature2mMin: (response.hourly.temperature_2m_min ?? []) as number[],
                temperature2m: (response.hourly.temperature_2m ?? []) as number[],
                relativeHumidity2m: (response.hourly.relative_humidity_2m ?? []) as number[],
                precipitationProbability: (response.hourly.precipitation_probability ?? []) as number[],
                pressureMsl: (response.hourly.pressure_msl ?? []) as number[],
                surfacePressure: (response.hourly.surface_pressure ?? []) as number[],
            } : undefined,

            currentUnits: response.current_units ? {
                weatherCode: response.current_units.weather_code,
                apparentTemperature: response.current_units.apparent_temperature,
                temperature2mMax: response.current_units.temperature_2m_max,
                temperature2mMin: response.current_units.temperature_2m_min
            } : undefined,

            dailyUnits: response.daily_units ? {
                weatherCode: response.daily_units.weather_code,
                precipitationProbabilityMean: response.daily_units.precipitation_probability_mean,
                temperature2mMax: response.daily_units.temperature_2m_max,
                temperature2mMin: response.daily_units.temperature_2m_min,
            } : undefined,

            hourlyUnits: response.hourly_units ? {
                weatherCode: response.hourly_units.weather_code,
                apparentTemperature: response.hourly_units.apparent_temperature,
                temperature2mMax: response.hourly_units.temperature_2m_max,
                temperature2mMin: response.hourly_units.temperature_2m_min,
                temperature2m: response.hourly_units.temperature_2m,
                relativeHumidity2m: response.hourly_units.relative_humidity_2m,
                precipitationProbability: response.hourly_units.precipitation_probability,
                pressureMsl: response.hourly_units.pressure_msl,
                surfacePressure: response.hourly_units.surface_pressure
            } : undefined
        };
    }
}

export default OpenMeteoService;
