import { DiaryHistoryItem } from '@/types/diary/DiaryHistoryItem';
import { computed, makeObservable, observable, runInAction } from 'mobx';

class DiaryHistoryStore {
    public data: DiaryHistoryItem[] = [
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
    ]

    constructor() {
        makeObservable(this, {
            history: computed,
            data: observable,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public get history() {
        return this.data;
    }

    // eslint-disable-next-line class-methods-use-this
    public addNote(item: DiaryHistoryItem) {
        runInAction(() => {
            this.data = [...this.data, item];
        })
    }
}

export default DiaryHistoryStore;
