import GeoMagneticService from '@/services/geoMagnetic/geoMagneticService';
import { makeObservable } from 'mobx';

class GeoMagneticStore {
    public geoMagneticService: GeoMagneticService = new GeoMagneticService();

    constructor() {
        makeObservable(this, {
        });
    }

    //2025-03-14T00:00:00Z&end=2025-03-20T23:59:59Z&index=Kp
    async fetch(): Promise<void> {
        const weather = await this.geoMagneticService.fetch({
            start: '2025-03-14T00:00:00Z',
            end: '2025-03-20T23:59:59Z',
            index: 'Kp'
        });
    }
}

export default GeoMagneticStore;
