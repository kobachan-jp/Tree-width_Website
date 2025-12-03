'use client'
import React, { useEffect, useState } from 'react'
import ReactFlow, { Background } from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from '../components/CustomNode'

export default function GraphPage() {
  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  //初回レンダリング時にサーバーからグラフデータを取得.
  useEffect(() => {
    //GETリクエスト送信
    fetch('/api/graph')
      //fetchはレスポンスオブジェクトを返すのでJSON型に変換.
      .then((res) => res.json())
      .then((data) => {
        //取得したデータをreact flow用にセット.
        const customNodes = data.nodes.map((n) => ({
          //...n は そのオブジェクトの全プロパティをコピー
          /*{
              id: "1",
              position: { x: 100, y: 100 },
              data: { label: "x1" },
              type: "custom"   // 新しく追加されたプロパティ
            }*/
          ...n,
          type: 'custom',
        }))
        setNodes(customNodes)
        setEdges(data.edges)
        setLoading(false)
      })
  }, [])

  const handleNodeClick = (event: any, node: any) => {
    setSelectedNode(node.id)
    console.log(`選択された頂点: ${node.data.label}`)
  }

  if (loading) return <p>読み込み中...</p>

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <h2 style={{ textAlign: 'center' }}>問題{selectedNode}</h2>
      <ReactFlow
        nodeTypes={{ custom: CustomNode }}
        nodes={nodes.map((n) => ({
          ...n,
          selected: n.id === selectedNode,
        }))}
        edges={edges}
        //onNodeClick は React Flow のイベントプロパティ.ノードをクリックしたときに呼ばれる.
        onNodeClick={handleNodeClick}
        onPaneClick={() => setSelectedNode(null)}
        onNodeDoubleClick={() => setSelectedNode(null)}
        //React Flow のプロパティで、グラフを画面に収めるための便利な設定.
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  )
}
