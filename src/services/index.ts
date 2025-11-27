import OpenMeteoService from "./weather/openMeteoService";
import SymptomsService from "./diary/symptomsService";
import DiaryHistoryService from "./diary/diaryHistoryService";
import { DbContextType } from "@db/index";
import GeoMagneticService from "./geoMagnetic/geoMagneticService";

export interface ServicesRootType {
    diaryHistoryService: DiaryHistoryService;
    symptomsService: SymptomsService;
    openMeteoService: OpenMeteoService;
    geoMagneticService: GeoMagneticService;
}

export const initServices = async (dbContext: DbContextType): Promise<ServicesRootType> => {
    const services = {
        diaryHistoryService: new DiaryHistoryService(dbContext.unitOfWork),
        symptomsService: new SymptomsService(dbContext.unitOfWork),
        openMeteoService: new OpenMeteoService(),
        geoMagneticService: new GeoMagneticService(),
    };

    return services;
};
