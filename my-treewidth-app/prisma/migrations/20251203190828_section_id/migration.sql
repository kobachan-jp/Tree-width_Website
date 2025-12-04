/*
  Warnings:

  - Made the column `sectionId` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL DEFAULT 'TrueOrFalse',
    "questionId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    CONSTRAINT "Problem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Problem" ("category", "id", "questionId", "sectionId") SELECT "category", "id", "questionId", "sectionId" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
