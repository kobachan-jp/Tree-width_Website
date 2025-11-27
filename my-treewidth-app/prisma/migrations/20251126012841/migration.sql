/*
  Warnings:

  - You are about to drop the column `answer` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Problem` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TrueOrFalse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER NOT NULL,
    "treeId" INTEGER NOT NULL,
    "answer" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "TrueOrFalse_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TrueOrFalse_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Input" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER NOT NULL,
    "treeId" INTEGER NOT NULL,
    "answer" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "Input_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Input_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "graphId" INTEGER NOT NULL,
    "treeId" INTEGER NOT NULL,
    "answer" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    CONSTRAINT "Choice_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Choice_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChoiceOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "choiceId" INTEGER NOT NULL,
    CONSTRAINT "ChoiceOption_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Choice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Graph" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Tree" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL DEFAULT 'TrueOrFalse',
    "questionId" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Problem" ("category", "id") SELECT "category", "id" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
