import { MeteoRequest } from "@appTypes/weather/MeteoRequest";
import { MeteoResponse } from "@appTypes/weather/MeteoResponse";
import RequestBuilder from "../core/RequestBuilder";

type MeteoRequestDataType = MeteoRequest;
type MeteoResponseDataType = MeteoResponse;

const GetWeatherRequest = RequestBuilder.getType<
    MeteoRequestDataType,
    MeteoResponseDataType
>(
    "meteo",
    {
        method: "get",
        url: "/forecast",
        useParams: true,
        cacheTimeInSeconds: 60,
    });

export default GetWeatherRequest;
