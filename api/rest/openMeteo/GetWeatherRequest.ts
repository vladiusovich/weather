import { MeteoRequest } from "@/types/weather/MeteoRequest";
import { MeteoResponse } from "@/types/weather/MeteoResponse";
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
