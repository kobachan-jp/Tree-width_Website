import ReactFlow, { Background } from 'reactflow'
import AnswerUI from './AnswerUI'
import { ProblemWithDetail, ProblemCategory } from '@/types'
import CustomNode from '../CustomNode'

export default function ProblemItem({
  p,
  result,
  handleAnswer,
}: {
  p: ProblemWithDetail
  result: boolean | undefined
  handleAnswer: (category: ProblemCategory, id: number, answer: number) => void
}) {
  // return文の直前に追加
  if (p.detail.graph !== undefined) {
    console.log('--- ノード位置 ---')
    p.detail.graph.nodes.forEach((n) =>
      console.log(`Node ID: ${n.nodeKey}, Position: (${n.x}, ${n.y})`),
    )
    p.detail.graph.edges.forEach((n) =>
      console.log(`edge ID: ${n.edgeKey}, source:${n.sourceId},target:${n.targetId}`),
    )
  }
  return (
    <div style={{ marginBottom: 30 }}>
      <p>問題 {p.id}</p>
      <p>{p.detail.text}</p>
      {p.detail.graph !== undefined && (
        <div style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
          <ReactFlow
            nodeTypes={{ custom: CustomNode }}
            nodes={p.detail.graph.nodes.map((n: any) => ({
              id: String(n.nodeKey),
              position: { x: Number(n.x), y: Number(n.y) },
              data: { label: n.label },
              type: 'custom', // custom など
            }))}
            edges={p.detail.graph.edges.map((e: any) => ({
              id: String(e.edgeKey),
              label: String(e.label),
              source: String(e.sourceId),
              target: String(e.targetId),
              sourceHandle: 'center',
              targetHandle: 'center',
              type: 'straight',
            }))}
            fitView
          >
            <Background />
          </ReactFlow>
        </div>
      )}
      <AnswerUI p={p} handleAnswer={handleAnswer} />

      {result !== undefined && <h3>{result ? '正解！' : '不正解'}</h3>}
    </div>
  )
}
