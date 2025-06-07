import OpenMeteoService from './weather/openMeteoService';
import SymptomsService from './diary/symptomsService';
import DiaryHistoryService from './diary/diaryHistoryService';
import { DbContextType } from '@/db';

export interface ServicesRootType {
    diaryHistoryService: DiaryHistoryService;
    symptomsService: SymptomsService;
    openMeteoService: OpenMeteoService;
}

export const initServices = async (dbContext: DbContextType): Promise<ServicesRootType> => {
    const services = {
        diaryHistoryService: new DiaryHistoryService(dbContext.unitOfWork),
        symptomsService: new SymptomsService(dbContext.unitOfWork),
        openMeteoService: new OpenMeteoService(),
    };

    return services;
};
