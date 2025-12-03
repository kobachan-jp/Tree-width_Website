import AnswerUI from './AnswerUI'
import { ProblemWithDetail } from '@/types'

export default function ProblemItem({
  p,
  result,
  handleAnswer,
}: {
  p: ProblemWithDetail
  result: boolean | undefined
  handleAnswer: (id: number, answer: number) => void
}) {
  return (
    <div style={{ marginBottom: 30 }}>
      <p>問題 {param.id}</p>
      <p>{p.detail.text}</p>
      {p.image && <img src={p.image} alt="問題画像" width={200} />}

      <AnswerUI p={p} handleAnswer={handleAnswer} />

      {result !== undefined && <h3>{result ? '正解！' : '不正解'}</h3>}
    </div>
  )
}
