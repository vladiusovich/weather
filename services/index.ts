import { unitOfWork } from '@/db';
import OpenMeteoService from './weather/openMeteoService';
import SymptomsService from './diary/symptomsService';
import DiaryHistoryService from './diary/diaryHistoryService';

// Initialize servecies
export const services = {
    diaryHistoryService: new DiaryHistoryService(unitOfWork),
    symptomsService: new SymptomsService(unitOfWork),
    openMeteoService: new OpenMeteoService(),
};
