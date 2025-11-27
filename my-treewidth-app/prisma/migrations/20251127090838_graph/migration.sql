-- CreateTable
CREATE TABLE "Node" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nodeKey" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "edgeKey" TEXT NOT NULL,
    "sourceId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    CONSTRAINT "Edge_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Edge_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GraphNode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GraphNode_A_fkey" FOREIGN KEY ("A") REFERENCES "Graph" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GraphNode_B_fkey" FOREIGN KEY ("B") REFERENCES "Node" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TreeNode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TreeNode_A_fkey" FOREIGN KEY ("A") REFERENCES "Node" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TreeNode_B_fkey" FOREIGN KEY ("B") REFERENCES "Tree" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GraphEdge" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GraphEdge_A_fkey" FOREIGN KEY ("A") REFERENCES "Edge" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GraphEdge_B_fkey" FOREIGN KEY ("B") REFERENCES "Graph" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TreeEdge" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TreeEdge_A_fkey" FOREIGN KEY ("A") REFERENCES "Edge" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TreeEdge_B_fkey" FOREIGN KEY ("B") REFERENCES "Tree" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GraphNode_AB_unique" ON "_GraphNode"("A", "B");

-- CreateIndex
CREATE INDEX "_GraphNode_B_index" ON "_GraphNode"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TreeNode_AB_unique" ON "_TreeNode"("A", "B");

-- CreateIndex
CREATE INDEX "_TreeNode_B_index" ON "_TreeNode"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GraphEdge_AB_unique" ON "_GraphEdge"("A", "B");

-- CreateIndex
CREATE INDEX "_GraphEdge_B_index" ON "_GraphEdge"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TreeEdge_AB_unique" ON "_TreeEdge"("A", "B");

-- CreateIndex
CREATE INDEX "_TreeEdge_B_index" ON "_TreeEdge"("B");
