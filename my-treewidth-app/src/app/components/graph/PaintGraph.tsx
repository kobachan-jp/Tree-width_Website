import ReactFlow, { Background, Node as RFNode, Edge as RFEdge } from 'reactflow'
import React, { useMemo, useState } from 'react'
import CustomNode from '../CustomNode'
import { ProblemWithDetail } from '@/types'
import 'reactflow/dist/style.css'

const nodeTypes = {
  custom: CustomNode,
}

export default function PaintGraph({ p }: { p: ProblemWithDetail }) {
  const initialNodes = useMemo(() => {
    return p.detail.graph?.nodes.map((n: any) => ({
      ...n,
      id: String(n.nodeKey),
      position: { x: Number(n.x), y: Number(n.y) },
      data: { label: n.label },
      type: 'custom',
    }))
  }, [p.detail.graph?.nodes]) // ← nodes が変わった時だけ再生成

  const initialEdges = useMemo(() => {
    if (!p.detail.graph) return []
    return p.detail.graph.edges.map((e: any) => ({
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
  }, [p.detail.graph?.edges]) // ← edges が変わった時だけ再生成

  return (
    <div style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
      <ReactFlow nodeTypes={nodeTypes} nodes={initialNodes} edges={initialEdges} fitView>
        <Background />
      </ReactFlow>
    </div>
  )
}
