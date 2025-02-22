import GetWeatherRequest from '@/api/rest/weather/GetWeatherRequest';
import { MeteoRequestType } from './types/MeteoRequestType';

class OpenMeteoService {
    private weatherRequest = new GetWeatherRequest();

    public async fetch(request: MeteoRequestType) {
        await this.weatherRequest.execute(request);

        const response = this.weatherRequest.data;

        return response;
    }
}

export default OpenMeteoService;
