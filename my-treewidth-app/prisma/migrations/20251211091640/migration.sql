/*
  Warnings:

  - You are about to drop the column `answer` on the `Choice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER,
    "treeId" INTEGER,
    "answerId" INTEGER NOT NULL DEFAULT 1,
    "reason" TEXT NOT NULL,
    CONSTRAINT "Choice_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Choice_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Choice_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "ChoiceOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Choice" ("graphId", "id", "reason", "text", "treeId") SELECT "graphId", "id", "reason", "text", "treeId" FROM "Choice";
DROP TABLE "Choice";
ALTER TABLE "new_Choice" RENAME TO "Choice";
CREATE TABLE "new_Input" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER,
    "treeId" INTEGER,
    "answer" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "Input_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Input_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Input" ("answer", "graphId", "id", "reason", "text", "treeId") SELECT "answer", "graphId", "id", "reason", "text", "treeId" FROM "Input";
DROP TABLE "Input";
ALTER TABLE "new_Input" RENAME TO "Input";
CREATE TABLE "new_TrueOrFalse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER,
    "treeId" INTEGER,
    "answer" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "TrueOrFalse_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TrueOrFalse_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TrueOrFalse" ("answer", "graphId", "id", "reason", "text", "treeId") SELECT "answer", "graphId", "id", "reason", "text", "treeId" FROM "TrueOrFalse";
DROP TABLE "TrueOrFalse";
ALTER TABLE "new_TrueOrFalse" RENAME TO "TrueOrFalse";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
