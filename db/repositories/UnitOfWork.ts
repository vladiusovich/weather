import { symptoms } from '../schema';
import { DbClient } from './types/DbClient';
import { GenericRepository } from './GenericRepository';
import { InferSelectModel } from 'drizzle-orm';

type TableNameType = 'symptoms' | 'another';

type TableDefinitions = {
    symptoms: typeof symptoms;
    another: typeof symptoms; // TODO: заменить на другую таблицу
};

type TableModels = {
    [K in keyof TableDefinitions]: InferSelectModel<TableDefinitions[K]>;
};

export class UnitOfWork {
    private readonly context: DbClient;

    private readonly tables: TableDefinitions = {
        symptoms,
        another: symptoms,
    };

    private readonly repoCache: {
        [K in TableNameType]?: GenericRepository<TableDefinitions[K], TableModels[K]>;
    } = {};

    constructor(db: DbClient) {
        this.context = db;
    }

    /**
     * Get or create cached GenericRepository instance.
     */
    getRepository<K extends TableNameType>(
        name: K,
        idField: keyof TableModels[K] = 'id'
    ): GenericRepository<TableDefinitions[K], TableModels[K]> {
        if (!this.repoCache[name]) {
            const table = this.tables[name];
            this.repoCache[name] = new GenericRepository(this.context, table, idField);
        }

        return this.repoCache[name]!;
    }

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
