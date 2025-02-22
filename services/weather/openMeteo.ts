import { fetchWeatherApi } from 'openmeteo';
import { MeteoRequestType } from './types/MeteoRequestType';
import { range } from '@/utils/array.helper';
import { WeatherDataType } from './types/WeatherDataType';
import { MeteoResponseType } from './types/MeteoResponseType';

const url = 'https://api.open-meteo.com/v1/forecast';

const getWeather = async (
    request: MeteoRequestType,
): Promise<MeteoResponseType> => {
    try {
        // const mockWeatherData: WeatherDataType = {
        //     current: {
        //         time: new Date('2023-10-05T14:00:00Z'), // Example date
        //         temperature_2m: 22.5,
        //         relative_humidity_2m: 68,
        //         apparent_temperature: 21.9,
        //         weather_code: 1, // Assuming 1 is a clear sky code
        //     },
        //     daily: {
        //         time: [
        //             new Date('2023-10-06T00:00:00Z'), // Example date for the first day
        //             new Date('2023-10-07T00:00:00Z'), // Example date for the second day
        //         ],
        //         temperature_2m_max: [25, 24],
        //         temperature_2m_min: [18, 17],
        //     },
        // };

        // return mockWeatherData; // For demonstration purposes, return mock data

        const responses = await fetchWeatherApi(url, request);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const current = response.current()!;
        const daily = response.daily()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData: MeteoResponseType = {
            current: {
                time: new Date(
                    (Number(current.time()) + utcOffsetSeconds) * 1000,
                ),
                temperature_2m: current?.variables(0)?.value(),
                relative_humidity_2m: current?.variables(1)?.value(),
                apparent_temperature: current?.variables(2)?.value(),
                weather_code: current?.variables(3)?.value(),
            },
            current_units: {
                temperature_2m: current?.variables(0)?.unit().toString() ?? '',
                relative_humidity_2m:
                    current?.variables(1)?.unit().toString() ?? '',
                apparent_temperature:
                    current?.variables(2)?.unit().toString() ?? '',
            },
            daily: {
                time: range(
                    Number(daily.time()),
                    Number(daily.timeEnd()),
                    daily.interval(),
                ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                temperature_2m_max: Array.from(
                    daily?.variables(0)?.valuesArray() ?? [],
                ),
                temperature_2m_min: Array.from(
                    daily?.variables(1)?.valuesArray() ?? [],
                ),
            },
        };

        return weatherData as MeteoResponseType;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export { getWeather };
