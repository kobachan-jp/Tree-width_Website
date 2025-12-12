import ReactFlow, { Background } from 'reactflow'
import React, { useMemo } from 'react'
import CustomNode from '../CustomNode'
import { ProblemWithDetail } from '@/types'
import 'reactflow/dist/style.css'

const nodeTypes = {
  custom: CustomNode,
}

export default function PaintTree({ p }: { p: ProblemWithDetail }) {
  const tree = p.detail.tree

  if (!tree) return null
  if ((!tree.nodes || tree.nodes.length === 0) && (!tree.edges || tree.edges.length === 0)) {
    return null // ← 空のとき ReactFlow を描画しない
  }

  const initialNodes = useMemo(() => {
    return p.detail.tree?.nodes.map((n: any) => ({
      ...n,
      id: String(n.nodeKey),
      position: { x: Number(n.x), y: Number(n.y) },
      data: { label: n.label },
      type: 'custom',
    }))
  }, [p.detail.tree?.nodes]) // ← nodes が変わった時だけ再生成

  const initialEdges = useMemo(() => {
    if (!p.detail.tree) return []
    return p.detail.tree.edges.map((e: any) => ({
      ...e,
      id: String(e.edgeKey),
      label: String(e.label),
      source: String(e.sourceId),
      target: String(e.targetId),
      sourceHandle: 'center',
      targetHandle: 'center',
      type: 'straight',
      style: {
        strokeWidth: 4,
        stroke: 'black',
      },
    }))
  }, [p.detail.tree?.edges]) // ← edges が変わった時だけ再生成

  return (
    <div style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={initialNodes}
        edges={initialEdges}
        fitView
      ></ReactFlow>
    </div>
  )
}
