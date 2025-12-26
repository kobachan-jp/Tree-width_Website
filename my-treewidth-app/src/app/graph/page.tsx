'use client';

import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  Connection,
  Background,
  Controls,
  NodeChange,
  EdgeChange
} from 'reactflow';
import EditCustomNode from '@/components/edit/EditCustomNode';
import 'reactflow/dist/style.css';

const nodeType = {
  custom : EditCustomNode,
}
export default function GraphEditor() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  /* ------------------
     ノード追加
  ------------------ */
  const addNode = () => {
    const id = crypto.randomUUID();

    const newNode: Node = {
      id,
      type : 'custom',
      position: {
        x: 100 + nodes.length * 80,
        y: 100,
      },
      data: { label: `v ${nodes.length + 1}` },
    };

    setNodes((nds) => [
      ...nds,
       newNode]);
  };

  /* ------------------
     エッジ追加
  ------------------ 
  const addEdgeByButton = () => {
    if (nodes.length < 2) return;

    const source = nodes[nodes.length - 2].id;
    const target = nodes[nodes.length - 1].id;

    const newEdge: Edge = {
      id: `e-${source}-${target}`,
      source,
      target,
    };

    setEdges((eds) => [...eds, newEdge]);
  };

  */

  const deleteSelected = () => {
  setNodes((nds) => nds.filter((n) => !n.selected));
  setEdges((eds) => eds.filter((e) => !e.selected));
};

  /* ------------------
     ReactFlow handlers
  ------------------ */
  const handleConnect = (connection: Connection) =>
    setEdges((eds) => addEdge(
      {
        ...connection,
//        type:'straight',
       },
        eds));

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes((nds) => applyNodeChanges(changes, nds));

  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  /* ------------------
     保存
  ------------------ */
  const saveGraph = async () => {
    await fetch('/api/graph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {/* 操作ボタン */}
      <div style={{ marginBottom: 8 }}>
        <button onClick={addNode}>ノード追加</button>
{/*        <button onClick={addEdgeByButton} style={{ marginLeft: 8 }}>
          エッジ追加
        </button>
*/}        
        <button onClick={deleteSelected}>選択削除</button>

        <button onClick={saveGraph} style={{ marginLeft: 8 }}>
          保存
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeType}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
