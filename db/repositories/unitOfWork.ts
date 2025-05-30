import { DbClient } from './types/dbClient';
import { SymptomRepository } from './symptomRepository';
import { DiaryHistoryRepository } from './diaryHistoryRepository';

/**

type TableNameType = 'symptoms' | 'diaryHistoryRecords';

type TableDefinitions = {
symptoms: typeof schema.symptoms;
diaryHistoryRecords: typeof schema.diaryHistoryRecords;
};

type TableModels = {
[K in keyof TableDefinitions]: InferSelectModel<TableDefinitions[K]>;
};
 */

export class UnitOfWork {
    public readonly symptomRepository: SymptomRepository;
    public readonly diaryHistoryRepository: DiaryHistoryRepository;

    private readonly context: DbClient;

    /**
    private readonly tables: TableDefinitions = {
        symptoms: schema.symptoms,
        diaryHistoryRecords: schema.diaryHistoryRecords,
    };
     */

    constructor(db: DbClient) {
        this.context = db;
        this.symptomRepository = new SymptomRepository(db);
        this.diaryHistoryRepository = new DiaryHistoryRepository(db);
    }

    /**
     * Get or create cached GenericRepository instance.
    getRepository<K extends TableNameType>(
        name: K,
        idField: keyof TableModels[K] = 'id'
    ): BaseGenericRepository<TableDefinitions[K], TableModels[K]> {
        const table = this.tables[name];
        return new BaseGenericRepository(this.context, table, idField);
    }
     */

    /**
     * Runs a function inside a database transaction, with a new UnitOfWork scoped to that transaction.
     */
    async withTransaction<T>(action: (trxUow: UnitOfWork) => Promise<T>): Promise<T> {
        return await this.context.transaction(async (tx) => {
            const trxUow = new UnitOfWork(tx as unknown as DbClient); // TODO
            return await action(trxUow);
        });
    }
}
