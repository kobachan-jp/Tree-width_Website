'use client'

import { useEffect, useState } from 'react'
import ReactFlow, { Node, Edge } from 'reactflow'
import CustomNode from '@/components/CustomNode'
import { useRouter } from 'next/navigation'

const nodeTypes = { custom: CustomNode }

export default function ConfirmTree() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const router = useRouter()
  useEffect(() => {
    const data = sessionStorage.getItem('tree')
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
    <main>
      <h1>木構造</h1>
      <div style={{ width: '50%', height: '600px', border: '5px solid #ccc' }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView></ReactFlow>
      </div>
    </main>
  )
}
