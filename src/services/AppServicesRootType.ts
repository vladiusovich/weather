import OpenMeteoService from "./weather/openMeteoService";
import SymptomsService from "./diary/symptomsService";
import DiaryHistoryService from "./diary/diaryHistoryService";
import GeoMagneticService from "./geoMagnetic/geoMagneticService";

export interface AppServicesRootType {
    diaryHistoryService: DiaryHistoryService;
    symptomsService: SymptomsService;
    openMeteoService: OpenMeteoService;
    geoMagneticService: GeoMagneticService;
}
