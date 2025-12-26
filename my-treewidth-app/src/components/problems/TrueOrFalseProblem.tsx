import { ProblemWithDetail, ProblemCategory } from '@/types'

export default function TrueOrFalseProblem({
  p,
  handleAnswer,
}: {
  p: ProblemWithDetail
  handleAnswer: (
    category: ProblemCategory,
    problemId: number,
    questionId: number,
    answer: number,
  ) => void
}) {
  return (
    <div style={{ display: 'flex', gap: '0px', justifyContent: 'center', marginLeft: '20em' }}>
      <div style={{ flex: 1 }}>
        <button
          className="problem-button"
          onClick={() => handleAnswer(ProblemCategory.TrueOrFalse, p.id, p.questionId, 1)}
          style={{
            display: 'flex',
            width: '90px', // ← 枠の横幅を固定
            height: '50px', // ← 枠の高さを固定
            alignItems: 'center', // ← 追加（縦方向中央）
            justifyContent: 'center', // ← 追加（横方向中央）
            padding: '10px 20px',
            fontSize: '60px',
            marginRight: '3em',
            backgroundColor: '#df1111ff', // 背景色*
          }}
        >
          ○
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <button
          className="problem-button"
          onClick={() => handleAnswer(ProblemCategory.TrueOrFalse, p.id, p.questionId, 0)}
          style={{
            display: 'flex',
            width: '90px', // ← 枠の横幅を固定
            height: '50px', // ← 枠の高さを固定
            alignItems: 'center', // ← 追加（縦方向中央）
            justifyContent: 'center', // ← 追加（横方向中央）
            padding: '10px 20px',
            fontSize: '50px',
            marginRight: '3em',
            marginLeft: '1em',
            fontWeight: 'normal',
            backgroundColor: '#3acfe2ff', // 背景色
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
