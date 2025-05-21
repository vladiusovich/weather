import { UnitOfWork } from '@/db/repositories/UnitOfWork';

class SymptomsService {
    constructor(private unitOfWork: UnitOfWork) {
    }

    public async getList() {
        const repo = this.unitOfWork.getRepository('symptoms');
        const result = await repo.findAll();
        return result.sort();
    }

    // TODO: add, delete, update
}

export default SymptomsService;