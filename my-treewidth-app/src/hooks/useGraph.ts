import { useCallback, useState } from 'react'
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

export function useGraph(labelPrefix: string) {
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const updateNodeLabel = useCallback((id: string, nextLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, label: nextLabel } }
        }
        return node
      }),
    )
  }, [])

  const addNode = () => {
    const id = crypto.randomUUID()

    const newNode: Node<CustomNodeData> = {
      id,
      type: 'custom',
      position: {
        x: 100,
        y: 100,
      },
      data: { label: `${labelPrefix}${nodes.length + 1}` },
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
        },
        eds,
      ),
    )

  const clearGraph = () => {
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
    clearGraph,
    onNodesChange,
    onEdgesChange,
    updateNodeLabel,
  }
}
