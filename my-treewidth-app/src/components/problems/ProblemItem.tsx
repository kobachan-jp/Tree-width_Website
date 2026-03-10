import AnswerUI from './AnswerUI'
import { ProblemWithDetail, ProblemCategory } from '@/types'
import CustomNode from '../CustomNode'
import 'reactflow/dist/style.css'
import PaintGraph from '../graph/PaintGraph'
import PaintTree from '../graph/PaintTree'
import React from 'react'

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
  handleAnswer: (category: ProblemCategory, questionId: number, answer: number) => void
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p
          style={{
            marginTop: 60,
            marginBottom: 60,
            whiteSpace: 'pre-wrap',
            lineHeight: 1.8,
            fontSize: '24px',
            textAlign: 'left',
          }}
        >
          {p.detail.text.split('\\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <AnswerUI p={p} handleAnswer={handleAnswer} />
        {result !== undefined && (
          <div>
            <h3
              style={{
                marginTop: '3em',
                fontWeight: 'bold',
                fontSize: '1.2em',
                marginLeft: '40em',
                color: result ? 'red' : 'blue',
              }}
            >
              {result ? '正解' : '不正解'}
            </h3>
            <h2
              style={{ marginTop: '3em', marginBottom: '2em', fontWeight: 'bold', fontSize: '1em' }}
            >
              解説：{p.detail.reason}
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}
