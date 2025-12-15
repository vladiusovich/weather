import { symptoms } from "../schema";
import { DbClient } from "./types/dbClient";
import { desc } from "drizzle-orm";
import { SQLiteInsertValue } from "drizzle-orm/sqlite-core";

export class SymptomRepository {
    constructor(
        protected db: DbClient,
    ) { }

    /** Fetch all records */
    async getAll() {
        return this.db.select().from(symptoms);
    }

    async getLatest(count: number) {
        return this.db
            .select()
            .from(symptoms)
            .orderBy(desc(symptoms.id))
            .limit(count);
    }

    /** Insert a new record; returns the newly created model (requires SQLite >=3.35) */
    async create(data: SQLiteInsertValue<typeof symptoms>) {
        const [item] = await this.db
            .insert(symptoms)
            .values(data)
            .returning();
        return item;
    }

    async createRange(data: SQLiteInsertValue<typeof symptoms>[]) {
        const [item] = await this.db
            .insert(symptoms)
            .values(data)
            .returning();
        return item;
    }
};

