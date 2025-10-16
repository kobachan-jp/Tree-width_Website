import { NextResponse } from "next/server"

export async function GET() {
  // 例: シンプルな三角形のグラフをサーバーで定義
  const graph = {
    nodes: [
      { id: "1", position: { x: 100, y: 100 }, data: { label: "x1" } },
      { id: "2", position: { x: 300, y: 100 }, data: { label: "x2" } },
      { id: "3", position: { x: 200, y: 250 }, data: { label: "x3" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2",type: "straight",arrowHeadType:"none" },
      { id: "e2-3", source: "2", target: "3",type: "straight",arrowHeadType:"none"  },
      { id: "e3-1", source: "3", target: "1",type: "straight",arrowHeadType:"none"  },
    ],
    correct: "2", // たとえばBが正解という設定
  }
  
  return NextResponse.json(graph)
}
