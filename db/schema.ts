import { relations } from "drizzle-orm";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const symptoms = sqliteTable("symptoms", {
    id: text("id").primaryKey().notNull(),
    name: text().notNull(),
});

export type SymptomEntity = typeof symptoms.$inferSelect;

export const diaryHistoryRecords = sqliteTable("diaryHistoryRecords", {
    id: text("id").primaryKey().notNull(),
    date: text().notNull(),
    comment: text(),
});

export type DiaryHistoryRecordsEntity = typeof diaryHistoryRecords.$inferSelect;

export const diaryHistoryRecordsToSymptoms = sqliteTable(
    "diaryHistoryRecords_to_symptoms",
    {
        diaryHistoryRecordId: text("diaryHistoryRecord_id")
            .notNull()
            .references(() => diaryHistoryRecords.id),
        symptomId: text("symptom_id")
            .notNull()
            .references(() => symptoms.id),
        strengtOfPain: int().notNull(),
    },
    (t) => [
        primaryKey({ columns: [t.diaryHistoryRecordId, t.symptomId] })
    ],
);

export const diaryHistoryRecordsRelations = relations(diaryHistoryRecords, ({ many }) => ({
    diaryHistoryRecordsToSymptoms: many(diaryHistoryRecordsToSymptoms),
}));

export const symptomsRelations = relations(symptoms, ({ many }) => ({
    diaryHistoryRecordsToSymptoms: many(diaryHistoryRecordsToSymptoms),
}));

export const diaryHistoryRecordsToSymptomsRelations = relations(diaryHistoryRecordsToSymptoms, ({ one }) => ({
    diaryHistoryRecord: one(diaryHistoryRecords, {
        fields: [diaryHistoryRecordsToSymptoms.diaryHistoryRecordId],
        references: [diaryHistoryRecords.id],
    }),
    symptom: one(symptoms, {
        fields: [diaryHistoryRecordsToSymptoms.symptomId],
        references: [symptoms.id],
    }),
}));
