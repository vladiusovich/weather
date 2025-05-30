import { UnitOfWork } from '@/db/repositories/unitOfWork';

class SymptomsService {
    constructor(private unitOfWork: UnitOfWork) {
    }

    public async getList() {
        const result = await this.unitOfWork.symptomRepository.getAll();
        return result.sort();
    }

    // TODO: add, delete, update
}

export default SymptomsService;