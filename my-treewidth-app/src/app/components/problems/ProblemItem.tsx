import ReactFlow, { Background} from 'reactflow'
import AnswerUI from './AnswerUI'
import { ProblemWithDetail, ProblemCategory } from '@/types'
import CustomNode from '../CustomNode'
import { useMemo } from 'react'
import 'reactflow/dist/style.css';
import PaintGraph from '../graph/PaintGraph'


const nodeTypes = {
  custom: CustomNode,
}
export default function ProblemItem({
  p,
  result,
  handleAnswer,
}: {
  p: ProblemWithDetail
  result: boolean | undefined
  handleAnswer: (category: ProblemCategory, id: number, answer: number) => void
}) {
/*  // ノードとエッジのメモ化
  const nodes = useMemo(() => {
    if (!p.detail.graph) return []
    return p.detail.graph.nodes.map((n: any) => ({
      ...n,
      id: String(n.nodeKey),
      position: { x: Number(n.x), y: Number(n.y) },
      data: { label: n.label },
      type: 'custom',
    }))
  }, [p.detail.graph?.nodes]) // ← nodes が変わった時だけ再生成
  
  const edges = useMemo(() => {
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
    }))
  }, [p.detail.graph?.edges])  // ← edges が変わった時だけ再生成
*/
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
      <p style={{ marginBottom: '1em' }}>問題 {p.id}</p>
      <p style={{ marginBottom: 30 }}>{p.detail.text}</p>
      <AnswerUI p={p} handleAnswer={handleAnswer} />
      {result !== undefined && <h3>{result ? '正解！' : '不正解'}</h3>}
      </div>
      <div style={{ flex: 1 }}>
      {p.detail.graph !== undefined &&
      <PaintGraph p={p}></PaintGraph>}
      </div>
      </div>
{/*
      {p.detail.graph !== undefined && (
        <div style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
          <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView>
            <Background />
          </ReactFlow>
        </div>
      )}
*/}
      

      
    </div>
  )
}
