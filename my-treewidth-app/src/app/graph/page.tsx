"use client"
import React, { useEffect, useState } from "react"
import ReactFlow, { Background } from "reactflow"
import "reactflow/dist/style.css"

export default function GraphPage() {
  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/graph")
      .then((res) => res.json())
      .then((data) => {
        setNodes(data.nodes)
        setEdges(data.edges)
        setLoading(false)
      })
  }, [])

  const handleNodeClick = (event: any, node: any) => {
    setSelectedNode(node.id)
    console.log(`選択された頂点: ${node.data.label}`)
  }

  if (loading) return <p>読み込み中...</p>

  const styledNodes = nodes.map((n) => ({
    ...n,
    style: {
      background: n.id === selectedNode ? "#FFD700" : "#89CFF0",
      borderRadius: "50%",
      width: 40,
      height: 40,
      padding: 15,
      color: "#000",
      textAlign: "center",
    },
  }))

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>問題: 頂点を選択してください</h2>
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  )
}
