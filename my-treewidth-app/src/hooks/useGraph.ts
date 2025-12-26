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

export function useGraph() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const addNode = () => {
    const id = crypto.randomUUID()

    const newNode: Node = {
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

  const onNodesChange = (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds))

  const onEdgesChange = (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds))

  return {
    nodes,
    edges,
    addNode,
    deleteSelected,
    handleConnect,
    onNodesChange,
    onEdgesChange,
  }
}
