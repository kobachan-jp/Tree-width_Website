'use client'

import React from 'react'
import ReactFlow, { Background, Controls } from 'reactflow'
import EditCustomNode from '@/components/edit/EditCustomNode'
import 'reactflow/dist/style.css'
import { useGraph } from '@/hooks/useGraph'

const nodeType = {
  custom: EditCustomNode,
}
export default function GraphEditor() {
  const { nodes, edges, addNode, handleConnect, deleteSelected, onNodesChange, onEdgesChange } =
    useGraph()

  /* ------------------
     保存
  ------------------ */
  const saveGraph = async () => {
    await fetch('/api/graph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    })
  }

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      {/* 操作ボタン */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={addNode}>ノード追加</button>
        <button onClick={deleteSelected}>選択削除</button>

        <button onClick={saveGraph} style={{ marginLeft: 8 }}>
          保存
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeType}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
