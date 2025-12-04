import { ProblemWithDetail } from '@/types'
import React, { useEffect, useState } from 'react'
import ReactFlow, { Background } from 'reactflow'
import CustomNode from '../CustomNode'

export default function PaintGraph(id: number) {
  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
}
