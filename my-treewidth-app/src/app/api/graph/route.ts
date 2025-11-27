// app/api/graph/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const graphId = 1;

  const graph = await prisma.graph.findUnique({
    where: { id: graphId },
    include: { nodes: true, edges: true }, // 関連も取得
  });

  if (!graph) {
    return NextResponse.json({ error: "Graph not found" }, { status: 404 });
  }

  return NextResponse.json(graph);
}

  // 例: シンプルな三角形のグラフをサーバーで定義

  /*
  const graph = {
    nodes: [
      { id: "1", position: { x: 100, y: 100 }, data: { label: "x1" } },
      { id: "2", position: { x: 300, y: 100 }, data: { label: "x2" } },
      { id: "3", position: { x: 200, y: 250 }, data: { label: "x3" } },
    ],
    //CustomNode.tsxで設定したcenterを使用する.
    edges: [
      { id: "e1-2", source: "1", target: "2",sourceHandle: "center",targetHandle: "center",type: "straight"},
      { id: "e2-3", source: "2", target: "3",sourceHandle: "center",targetHandle: "center",type: "straight"},
      { id: "e3-1", source: "3", target: "1",sourceHandle: "center",targetHandle: "center",type: "straight"},
    ],
    correct: "2", // たとえばBが正解という設定
  }
*/  

