/*
  Warnings:

  - You are about to drop the column `answerId` on the `Choice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER,
    "treeId" INTEGER,
    "answer" INTEGER NOT NULL DEFAULT 1,
    "reason" TEXT NOT NULL,
    CONSTRAINT "Choice_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Choice_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Choice_answer_fkey" FOREIGN KEY ("answer") REFERENCES "ChoiceOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Choice" ("graphId", "id", "reason", "text", "treeId") SELECT "graphId", "id", "reason", "text", "treeId" FROM "Choice";
DROP TABLE "Choice";
ALTER TABLE "new_Choice" RENAME TO "Choice";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
