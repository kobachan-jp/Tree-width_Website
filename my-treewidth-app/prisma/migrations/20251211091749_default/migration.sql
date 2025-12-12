-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER,
    "treeId" INTEGER,
    "answerId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "Choice_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Choice_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Choice_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "ChoiceOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Choice" ("answerId", "graphId", "id", "reason", "text", "treeId") SELECT "answerId", "graphId", "id", "reason", "text", "treeId" FROM "Choice";
DROP TABLE "Choice";
ALTER TABLE "new_Choice" RENAME TO "Choice";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
