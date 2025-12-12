import ReactFlow, { Background } from 'reactflow'
import AnswerUI from './AnswerUI'
import { ProblemWithDetail, ProblemCategory } from '@/types'
import CustomNode from '../CustomNode'
import { useMemo } from 'react'
import 'reactflow/dist/style.css'
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
          <p style={{ marginBottom: '1em' }}>問題 {p.id}</p>
          <p style={{ marginBottom: 30 }}>{p.detail.text}</p>
          <AnswerUI p={p} handleAnswer={handleAnswer} />
          {result !== undefined && <h3>{result ? '正解！' : '不正解'}</h3>}
        </div>

        <div style={{ flex: 1 }}>
          <PaintGraph p={p}></PaintGraph>
        </div>
      </div>
    </div>
  )
}
