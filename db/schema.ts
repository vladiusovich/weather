import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const symptoms = sqliteTable('symptoms', {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
});

export type SymptomEntity = typeof symptoms.$inferSelect;
