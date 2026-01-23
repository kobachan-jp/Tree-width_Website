'use client'

import React, { useEffect, useMemo } from 'react'
import ReactFlow, { Background, Controls, NodeProps } from 'reactflow'
import EditCustomNode from '@/components/edit/EditCustomNode'
import 'reactflow/dist/style.css'
import { useGraph } from '@/hooks/useGraph'
import { CustomNodeData } from '@/hooks/useGraph'
import { ReactFlowButton } from '@/components/edit/ReactFlowButton'

export default function MakeGraph() {
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
    clearGraph,
    updateNodeLabel,
  } = useGraph('X')

  // nodeTypes を useMemo で定義
  const nodeTypes = useMemo(
    () => ({
      custom: (props: NodeProps<CustomNodeData>) => (
        <EditCustomNode {...props} onChangeLabel={updateNodeLabel} />
      ),
    }),
    [updateNodeLabel],
  )

  //復元されたとき用
  useEffect(() => {
    const data = sessionStorage.getItem('tree')
    if (data) {
      const parsed = JSON.parse(data)
      setNodes(parsed.nodes)
      setEdges(parsed.edges)
    }
  }, [setNodes, setEdges])

  //確認画面用にキャッシュ
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      sessionStorage.setItem('tree', JSON.stringify({ nodes, edges }))
    }
  }, [nodes, edges])

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
