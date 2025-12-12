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
    <div style={{ display: 'flex', gap: '0px', justifyContent: 'center' }}>
      <div>
        <button
          onClick={() => handleAnswer(ProblemCategory.TrueOrFalse, p.id, p.questionId, 1)}
          style={{
            padding: '4px 15px',
            fontSize: '2em',
            marginRight: '3em',
            cursor: 'pointer',
            border: '2px solid #333', // 枠線の太さと色
            borderRadius: '4px', // 角の丸み
            backgroundColor: '#df1111ff', // 背景色
          }}
        >
          ○
        </button>
      </div>
      <div>
        <button
          onClick={() => handleAnswer(ProblemCategory.TrueOrFalse, p.id, p.questionId, 0)}
          style={{
            padding: '4px 15px',
            fontSize: '2em',
            cursor: 'pointer',
            border: '2px solid #333', // 枠線の太さと色
            borderRadius: '4px', // 角の丸み
            backgroundColor: '#3acfe2ff', // 背景色
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
