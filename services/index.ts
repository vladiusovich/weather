import { unitOfWork } from '@/db';
import SymptomsService from './diary/SymptomsService';

export const services = {
    symptomsService: new SymptomsService(unitOfWork),
};
