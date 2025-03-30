import { Symptom } from '@/types/diary/DiaryHistoryItem';
import { computed, makeObservable } from 'mobx';

type SymptomType = Omit<Symptom, 'strengtOfPain'>;

const symptoms: SymptomType[] = [
    { id: 'b6018c1f-04f3-454f-b73d-4ecd1b8cce01', name: 'Headache' },
    { id: 'f18b4891-2968-4e65-ae7c-c3a2169b0251', name: 'Migraine' },
    { id: 'b2a5a5a6-d471-4f35-8221-11d67a1d065f', name: 'Joint pain' },
    { id: '89f41732-8169-4c22-8e04-d966e481c408', name: 'Muscle ache' },
    { id: 'ef41ab34-9219-4236-b7ba-dfa7a804787d', name: 'Back pain' },
    { id: '5b3d6ce7-1384-4cd2-976e-5ea00a498902', name: 'Neck pain' },
    { id: '4bea88f1-fdd0-461c-b922-f29abafb3725', name: 'Scarring pain' },
    { id: '18c28439-f63a-47dc-b10b-8dc74b2a26eb', name: 'Toothache' },
    { id: '93c230d9-5101-4621-9eb4-613ace1d5b81', name: 'Pressure in sinuses' },
    { id: '87aa500b-99fe-4cca-a9d8-cc6a04fc247b', name: 'Fatigue' },
];

class SymptomsStore {
    constructor() {
        makeObservable(this, {
            data: computed,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public get data() {
        return symptoms;
    }
}

export default SymptomsStore;
