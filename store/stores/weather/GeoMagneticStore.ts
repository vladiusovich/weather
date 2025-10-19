import GeoMagneticService from "@/services/geoMagnetic/geoMagneticService";
import { GeoMagneticData } from "@/services/weather/types/models/GeoMagneticData";
import { add, getNow } from "@/utils/datetime.helper";
import { makeObservable, observable, runInAction } from "mobx";

type ConstructorArgsType = {
    geoMagneticService: GeoMagneticService;
};

class GeoMagneticStore {
    public data: GeoMagneticData | null = null;

    constructor(protected args: ConstructorArgsType) {
        makeObservable(this, {
            data: observable,
        });
    }

    public get currentKpIndex() {
        const kPs = this.data?.Kp ?? [];
        return kPs.at(kPs.length - 1);
    }

    // 2025-03-14T00:00:00Z&end=2025-03-20T23:59:59Z&index=Kp
    async fetch() {
        const data = await this.args.geoMagneticService.fetch({
            start: add(-12, "hour"),
            end: getNow(),
            index: "Kp"
        });


        runInAction(() => {
            this.data = data;
        });
    }
}

export default GeoMagneticStore;
