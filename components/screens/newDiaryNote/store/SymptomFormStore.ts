import NewNoteFormStore from "./NewNoteFormStore";
import AppStoreType from "@/store/AppStoreType";
import { TFunction } from "i18next";
import LocalizedFormStore from "@/store/formStore/LocalizedFormStore";
import { ValidatorBuilder } from "@/validation";
import constraints from "@/validation/constraints";
import { makeObservable, observable, runInAction } from "mobx";

export type SymptomFormFields = {
    strengtOfPain: number[];
    symptom: string;
}

type FormModeType = "add" | "edit"

class SymptomFormStore extends LocalizedFormStore<SymptomFormFields> {
    private masterForm: NewNoteFormStore;

    public mode: FormModeType = "add";

    constructor(
        store: AppStoreType,
        t: TFunction,
        masterForm: NewNoteFormStore
    ) {
        super(store, t);

        makeObservable(this, {
            mode: observable,
        });

        this.initValidation({
            strengtOfPain: ValidatorBuilder.create<number[]>()
                .add("required", constraints.requiredRange)
                .build({
                    required: this.t("common.fields.errors.required"),
                }),
            symptom: ValidatorBuilder.create<string>()
                .add("required", constraints.required)
                .build({
                    required: this.t("common.fields.errors.required"),
                }),
        });

        this.masterForm = masterForm;
    }

    public fillSymptom(id: string, strengtOfPain: number) {
        this.setValue("symptom", id);
        this.setValue("strengtOfPain", [strengtOfPain]);
        this.toggleFieldDisabled("symptom", true);
    }

    public switchMode(mode: FormModeType) {
        runInAction(() => {
            this.mode = mode;
        });
    }

    async submit(): Promise<void> {
        this.masterForm.addOrUpdateSymptom(this.values);
    }

    public reset(): void {
        super.reset();
        this.switchMode("add");
    }
}

export default SymptomFormStore;
