import { ProblemWithDetail,ProblemCategory } from '@/types'

export default function TrueOrFalseProblem({
  p,
  handleAnswer,
}: {
  p: ProblemWithDetail
  handleAnswer: (category:ProblemCategory,id: number, answer: number) => void
}) {
  return (
    <div>
      <button
        onClick={() => handleAnswer(ProblemCategory.TrueOrFalse,p.id, 1)}
        style={{
          padding: '4px 10px',
          fontSize: '1em',
          cursor: 'pointer',
          border: '2px solid #333', // 枠線の太さと色
          borderRadius: '4px', // 角の丸み
          backgroundColor: '#df1111ff', // 背景色
        }}
      >
        ○
      </button>
      <button
        onClick={() => handleAnswer(ProblemCategory.TrueOrFalse,p.id, 0)}
        style={{
          padding: '4px 10px',
          fontSize: '1em',
          cursor: 'pointer',
          border: '2px solid #333', // 枠線の太さと色
          borderRadius: '4px', // 角の丸み
          backgroundColor: '#3acfe2ff', // 背景色
        }}
      >
        ×
      </button>
    </div>
  )
}
