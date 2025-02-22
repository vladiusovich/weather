import { MeteoResponseType } from '@/services/weather/types/MeteoResponseType';
import RequestBuilder from '../core/RequestBuilder';
import { MeteoRequestType } from '@/services/weather/types/MeteoRequestType';

type MeteoRequestDataType = MeteoRequestType;
type MeteoResponseDataType = MeteoResponseType;

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
