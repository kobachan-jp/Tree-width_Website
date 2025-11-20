-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'TrueOrFalse',
    "image" TEXT,
    "answer" INTEGER NOT NULL
);
INSERT INTO "new_Problem" ("answer", "id", "image", "text") SELECT "answer", "id", "image", "text" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
