// import { eq, InferSelectModel, Table } from 'drizzle-orm';
// import { DbClient } from './types/dbClient';
// import { SQLiteInsertValue } from 'drizzle-orm/sqlite-core';

// /**
//  * A generic repository providing basic CRUD operations for any Drizzle table.
//  *
//  * @template TTable   Drizzle Table type
//  */
// export class BaseGenericRepository<
//     TTable extends Table,
//     TModel extends InferSelectModel<TTable>,
// > {
//     constructor(
//         protected db: DbClient,
//         protected table: TTable,
//         /** Name of the primary key column in the model */
//         protected primaryKey: keyof TModel
//     ) { }

//     /** Fetch all records */
//     async getAll() {
//         return this.db.select().from(this.table);
//     }

//     /** Fetch a single record by primary key */
//     async findById(id: TModel[typeof this.primaryKey]) {
//         const [item] = await this.db
//             .select()
//             .from(this.table)
//             .where(eq(this.table.$inferInsert['id'], id))
//             .limit(1);
//         return item;
//     }

//     /** Insert a new record; returns the newly created model (requires SQLite >=3.35) */
//     async create(data: SQLiteInsertValue<TTable>[]) {
//         const [item] = await this.db
//             .insert(this.table)
//             .values(data)
//             .returning();
//         return item;
//     }

//     /** Update a record by primary key; returns updated model if supported */
//     async update(
//         id: TModel[typeof this.primaryKey],
//         data: SQLiteInsertValue<TTable>
//     ) {
//         const [item] = await this.db
//             .update(this.table)
//             .set(data)
//             .where(eq(this.table.$inferInsert['id'], id))
//             .returning();
//         return item;
//     }

//     /** Delete a record by primary key; returns number of rows deleted */
//     async delete(id: TModel[typeof this.primaryKey]) {
//         return this.db
//             .delete(this.table)
//             .where(eq(this.table.$inferInsert['id'], id));
//     }
// }
