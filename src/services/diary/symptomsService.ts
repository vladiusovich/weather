import { generateUUID } from "@./src/utils/generateUUID";
import { UnitOfWork } from "@db/repositories/unitOfWork";

class SymptomsService {
    constructor(private unitOfWork: UnitOfWork) {
    }

    public async getList() {
        const result = await this.unitOfWork.symptomRepository.getAll();
        return result.sort();
    }


    // TODO: creteria: popular | last | etc
    public async getListOf(creteria: "popular") {
        return await this.unitOfWork.symptomRepository.getLatest(5);
    }

    // TODO: add, delete, update

    public async add(symptom: { name: string }) {
        return this.unitOfWork.symptomRepository.create({
            id: generateUUID(),
            ...symptom,
        });
    }
}

export default SymptomsService;