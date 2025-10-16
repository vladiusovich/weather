export type ApiUrlType = "meteo" | "geoMagnetic";

// TODO: config file?
const apiUrls: Record<ApiUrlType, string> = {
    meteo: "https://api.open-meteo.com/v1",
    geoMagnetic: "https://kp.gfz-potsdam.de/app",
};

export default apiUrls;
