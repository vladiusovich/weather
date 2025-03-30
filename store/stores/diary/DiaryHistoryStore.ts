import { DiaryHistoryItem } from '@/types/diary/DiaryHistoryItem';
import { computed, makeObservable } from 'mobx';

const historyItems: DiaryHistoryItem[] = [
    {
        id: 'a2c35a5b-5d19-413e-b69f-b8f9600eb204',
        date: '2025-03-30',
        comment: 'Day 1 symptom log.',
        symptoms: [
            { id: '89f41732-8169-4c22-8e04-d966e481c408', name: 'Muscle ache', strengtOfPain: 5 },
            { id: '5b3d6ce7-1384-4cd2-976e-5ea00a498902', name: 'Neck pain', strengtOfPain: 5 },
            { id: 'b6018c1f-04f3-454f-b73d-4ecd1b8cce01', name: 'Headache', strengtOfPain: 4 }
        ]
    },
    {
        id: 'ee5642d7-599c-4fd2-beae-0a3ef5e086e7',
        date: '2025-03-29',
        symptoms: []
    },
    {
        id: '5ea89c9b-8b91-47d7-ad2f-0fe07b88aaaa',
        date: '2025-03-28',
        comment: 'Day 3 symptom log.',
        symptoms: [
            { id: 'b2a5a5a6-d471-4f35-8221-11d67a1d065f', name: 'Joint pain', strengtOfPain: 10 },
            { id: '89f41732-8169-4c22-8e04-d966e481c408', name: 'Muscle ache', strengtOfPain: 9 },
            { id: '5b3d6ce7-1384-4cd2-976e-5ea00a498902', name: 'Neck pain', strengtOfPain: 9 }
        ]
    },
    {
        id: 'b6925339-0441-4076-ac08-b7ca96b3adaa',
        date: '2025-03-27',
        comment: 'Day 4 symptom log.',
        symptoms: [
            { id: '4bea88f1-fdd0-461c-b922-f29abafb3725', name: 'Scarring pain', strengtOfPain: 7 },
            { id: '87aa500b-99fe-4cca-a9d8-cc6a04fc247b', name: 'Fatigue', strengtOfPain: 8 },
            { id: 'b6018c1f-04f3-454f-b73d-4ecd1b8cce01', name: 'Headache', strengtOfPain: 4 }
        ]
    },
    {
        id: 'bcde5fa2-7c4b-47f0-94e2-995467e48033',
        date: '2025-03-26',
        symptoms: [
            { id: '93c230d9-5101-4621-9eb4-613ace1d5b81', name: 'Pressure in sinuses', strengtOfPain: 6 },
            { id: 'f18b4891-2968-4e65-ae7c-c3a2169b0251', name: 'Migraine', strengtOfPain: 8 },
            { id: '5b3d6ce7-1384-4cd2-976e-5ea00a498902', name: 'Neck pain', strengtOfPain: 7 }
        ]
    },
    {
        id: '1eb15445-b854-49a5-9e92-18c6ded29b8b',
        date: '2025-03-25',
        symptoms: [
            { id: 'b2a5a5a6-d471-4f35-8221-11d67a1d065f', name: 'Joint pain', strengtOfPain: 5 }
        ]
    },
    {
        id: '830f4c8d-308b-456e-b436-1e403069c6f8',
        date: '2025-03-24',
        comment: 'Day 7 symptom log.',
        symptoms: [
            { id: '89f41732-8169-4c22-8e04-d966e481c408', name: 'Muscle ache', strengtOfPain: 6 }
        ]
    },
    {
        id: '39447b56-0023-4f58-b14a-40a5070905ac',
        date: '2025-03-23',
        symptoms: [
            { id: 'b6018c1f-04f3-454f-b73d-4ecd1b8cce01', name: 'Headache', strengtOfPain: 9 },
            { id: '5b3d6ce7-1384-4cd2-976e-5ea00a498902', name: 'Neck pain', strengtOfPain: 8 }
        ]
    }
];

class DiaryHistoryStore {
    constructor() {
        makeObservable(this, {
            data: computed,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public get data() {
        return historyItems;
    }
}

export default DiaryHistoryStore;
