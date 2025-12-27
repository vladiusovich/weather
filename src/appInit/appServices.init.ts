import OpenMeteoService from "../services/weather/openMeteoService";
import SymptomsService from "../services/diary/symptomsService";
import DiaryHistoryService from "../services/diary/diaryHistoryService";
import { DbContextType } from "@db/index";
import GeoMagneticService from "../services/geoMagnetic/geoMagneticService";
import { AppServicesRootType } from "../services/AppServicesRootType";
import { AppApiLayer } from "@api/rest/AppApiLayer";

const initAppServices = async (dbContext: DbContextType, api: AppApiLayer): Promise<AppServicesRootType> => {
    const services = {
        diaryHistoryService: new DiaryHistoryService(dbContext.unitOfWork),
        symptomsService: new SymptomsService(dbContext.unitOfWork),
        openMeteoService: new OpenMeteoService(api.meteo),
        geoMagneticService: new GeoMagneticService(api.geoMagneticApi),
    };

    return services;
};

export default initAppServices;
