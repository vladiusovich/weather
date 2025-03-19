import { MeteoResponse } from '@/services/weather/types/MeteoResponse';
import RequestBuilder from '../core/RequestBuilder';
import { MeteoRequest } from '@/services/weather/types/MeteoRequest';

type MeteoRequestDataType = MeteoRequest;
type MeteoResponseDataType = MeteoResponse;

const GetWeatherRequest = RequestBuilder.getType<
    MeteoRequestDataType,
    MeteoResponseDataType
>({
    method: 'get',
    url: '/forecast',
    useParams: true,
    cacheTimeInSeconds: 60,
});

export default GetWeatherRequest;
