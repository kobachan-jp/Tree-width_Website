'use client'

import React from 'react'
import ReactFlow, { Background, Controls } from 'reactflow'
import EditCustomNode from '@/components/edit/EditCustomNode'
import 'reactflow/dist/style.css'
import { useGraph } from '@/hooks/useGraph'
import { useRouter } from 'next/navigation'

const nodeType = {
  custom: EditCustomNode,
}
export default function GraphEditor() {
  const { nodes, edges, addNode, handleConnect, deleteSelected, onNodesChange, onEdgesChange } =
    useGraph()

  /* ------------------
     確認画面へ遷移
  ------------------ */

  const router = useRouter()
  const goConfirm = () => {
    //sessionStorage:ブラウザにある保存領域,setItem(key,value)で文字列のみ保存できる故JSON文字列に変換
    sessionStorage.setItem('graph', JSON.stringify({ nodes, edges }))
    router.push('/graph/confirm')
  }

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      {/* 操作ボタン */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={addNode}>ノード追加</button>
        <button onClick={deleteSelected}>選択削除</button>

        <button onClick={goConfirm} style={{ marginLeft: 8 }}>
          確認
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
