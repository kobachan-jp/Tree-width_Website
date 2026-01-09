'use client'

import React, { useEffect } from 'react'
import ReactFlow, { Background, Controls, NodeProps } from 'reactflow'
import EditCustomNode from '@/components/edit/EditCustomNode'
import 'reactflow/dist/style.css'
import { useGraph } from '@/hooks/useGraph'
import { useRouter } from 'next/navigation'
import { CustomNodeData } from '@/hooks/useGraph'
import { ClearButton } from '@/components/edit/ClearButton'

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
    ClearGraph,
  } = useGraph()

  const nodeTypes = {
    custom: (props: NodeProps<CustomNodeData>) => (
      <EditCustomNode {...props} onChangeLabel={updateNodeLabel} />
    ),
  }
  //復元されたとき用
  useEffect(() => {
    const needsRestore = sessionStorage.getItem('needs_restore')
    const data = sessionStorage.getItem('graph')
    if (data) {
      const parsed = JSON.parse(data)
      setNodes(parsed.nodes)
      setEdges(parsed.edges)
      //reloadしたら削除
      sessionStorage.removeItem('needs_restore')
      sessionStorage.removeItem('graph')
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
    <div style={{ width: '100%', height: '1000px' }}>
      {/* 操作ボタン */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={addNode}>ノード追加</button>
        <button onClick={deleteSelected}>選択削除</button>
        <ClearButton onClear={ClearGraph} label="クリア"></ClearButton>
        <button onClick={goConfirm} style={{ marginLeft: 8 }}>
          確認
        </button>
      </div>

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
  )
}
