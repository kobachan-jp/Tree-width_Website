'use client'

import { useEffect, useMemo, useState } from 'react'
import ReactFlow, { Node, Edge } from 'reactflow'
import CustomNode from '@/components/CustomNode'

const nodeTypes = { custom: CustomNode }

export default function Confirm() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  useEffect(() => {
    const data = sessionStorage.getItem('graph')
    if (data) {
      const parsed = JSON.parse(data)
      setNodes(parsed.nodes)
      const styledEdges = parsed.edges.map((e: Edge) => ({
        ...e,
        sourceHandle: 'center',
        targetHandle: 'center',
        type: 'straight',
        style: {
          strokeWidth: 4,
          stroke: 'black',
        },
      }))
      setEdges(styledEdges)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '1000px', border: '1px solid #ccc' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView></ReactFlow>
    </div>
  )
}
