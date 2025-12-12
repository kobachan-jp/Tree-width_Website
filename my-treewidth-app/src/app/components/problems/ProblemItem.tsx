import ReactFlow, { Background } from 'reactflow'
import AnswerUI from './AnswerUI'
import { ProblemWithDetail, ProblemCategory } from '@/types'
import CustomNode from '../CustomNode'
import { useMemo } from 'react'
import 'reactflow/dist/style.css'
import PaintGraph from '../graph/PaintGraph'
import PaintTree from '../graph/PaintTree'

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
  handleAnswer: (
    category: ProblemCategory,
    problemId: number,
    questionId: number,
    answer: number,
  ) => void
}) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <PaintGraph p={p}></PaintGraph>
        </div>
        <div style={{ flex: 1 }}>
          <PaintTree p={p}></PaintTree>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginTop: '3em', marginBottom: '2em', fontWeight: 'bold', fontSize: '1em' }}>
          問題 {p.id}
        </p>
        <p style={{ marginBottom: 30 }}>{p.detail.text}</p>
        <AnswerUI p={p} handleAnswer={handleAnswer} />
        {result !== undefined && (
          <h3
            style={{
              marginTop: '3em',
              fontWeight: 'bold',
              fontSize: '1.5em',
              color: result ? 'lightgreen' : 'blue',
            }}
          >
            {result ? '正解！' : '不正解'}
          </h3>
        )}
      </div>
    </div>
  )
}
