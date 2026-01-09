import { useState } from 'react'
import {
  Node,
  Edge,
  addEdge,
  Connection,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow'

export type CustomNodeData = {
  label: string
}

export function useGraph() {
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const updateNodeLabel = (id: string, label: string) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n)))
  }

  const addNode = () => {
    const id = crypto.randomUUID()

    const newNode: Node<CustomNodeData> = {
      id,
      type: 'custom',
      position: {
        x: 100 + nodes.length * 80,
        y: 100,
      },
      data: { label: `v ${nodes.length + 1}` },
    }

    setNodes((nds) => [...nds, newNode])
  }

  const deleteSelected = () => {
    setNodes((nds) => nds.filter((n) => !n.selected))
    setEdges((eds) => eds.filter((e) => !e.selected))
  }

  const handleConnect = (connection: Connection) =>
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          //        type:'straight',
        },
        eds,
      ),
    )

  const ClearGraph = () => {
    setNodes([])
    setEdges([])
  }

  const onNodesChange = (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds))

  const onEdgesChange = (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds))

  return {
    nodes,
    edges,
    setEdges,
    setNodes,
    addNode,
    deleteSelected,
    handleConnect,
    ClearGraph,
    onNodesChange,
    onEdgesChange,
    updateNodeLabel,
  }
}
