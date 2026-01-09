'use client'

import React, { useEffect } from 'react'
import ReactFlow, { Background, Controls, NodeProps } from 'reactflow'
import EditCustomNode from '@/components/edit/EditCustomNode'
import 'reactflow/dist/style.css'
import { useGraph } from '@/hooks/useGraph'
import { useRouter } from 'next/navigation'
import { CustomNodeData } from '@/hooks/useGraph'
import { ReactFlowButton } from '@/components/edit/ReactFlowButton'

export default function GraphEditor() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    handleConnect,
    deleteSelected,
    onNodesChange,
    onEdgesChange,
    updateNodeLabel,
    clearGraph,
  } = useGraph()

  const nodeTypes = {
    custom: (props: NodeProps<CustomNodeData>) => (
      <EditCustomNode {...props} onChangeLabel={updateNodeLabel} />
    ),
  }
  //復元されたとき用
  useEffect(() => {
    const data = sessionStorage.getItem('graph')
    if (data) {
      const parsed = JSON.parse(data)
      setNodes(parsed.nodes)
      setEdges(parsed.edges)
      //reloadしたら削除
    }
  }, [setNodes, setEdges])

  /* ------------------
     確認画面へ遷移
  ------------------ */

  const router = useRouter()
  const goConfirm = () => {
    //sessionStorage:ブラウザにある保存領域,setItem(key,value)で文字列のみ保存できる故JSON文字列に変換
    sessionStorage.setItem('graph', JSON.stringify({ nodes, edges }))
    sessionStorage.setItem('needs_restore', 'true')
    router.push('/graph/confirm')
  }

  return (
    <div
      style={{
        width: '80%',
        height: '800px',
        border: '5px solid #ccc',
        boxSizing: 'border-box',
        display: 'flex',
      }}
    >
      {/* 左：操作パネル */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: 8,
          width: 200,
        }}
      >
        <ReactFlowButton onAction={addNode} label="ノード追加" />
        <ReactFlowButton onAction={deleteSelected} label="削除" />
        <ReactFlowButton onAction={clearGraph} label="クリア" />
        <ReactFlowButton onAction={goConfirm} label="確認画面へ" />
      </div>

      {/* 右：ReactFlow */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}
