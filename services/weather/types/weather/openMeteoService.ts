import GetWeatherRequest from '@/api/rest/weather/GetWeatherRequest';
import { MeteoRequest } from '../MeteoRequest';
import { MeteoResponse } from '../MeteoResponse';

class OpenMeteoService {
    private weatherRequest = new GetWeatherRequest();

    public async fetch(request: MeteoRequest): Promise<MeteoResponse | null> {
        await this.weatherRequest.execute(request);
        return this.weatherRequest.data;
    }
}

export default OpenMeteoService;
