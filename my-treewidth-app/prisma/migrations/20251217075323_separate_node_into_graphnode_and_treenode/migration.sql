/*
  Warnings:

  - You are about to drop the `Edge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GraphEdge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GraphNode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TreeEdge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TreeNode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Edge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Node";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GraphEdge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GraphNode";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TreeEdge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TreeNode";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GraphNode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nodeKey" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "label" TEXT NOT NULL,
    "graphId" INTEGER NOT NULL,
    CONSTRAINT "GraphNode_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GraphEdge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "edgeKey" TEXT NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "graphId" INTEGER NOT NULL,
    CONSTRAINT "GraphEdge_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "GraphNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GraphEdge_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "GraphNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GraphEdge_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreeNode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nodeKey" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "label" TEXT NOT NULL,
    "treeId" INTEGER NOT NULL,
    CONSTRAINT "TreeNode_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreeEdge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "edgeKey" TEXT NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "treeId" INTEGER NOT NULL,
    CONSTRAINT "TreeEdge_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "TreeNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TreeEdge_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "TreeNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TreeEdge_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
