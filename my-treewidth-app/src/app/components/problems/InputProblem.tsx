import { ProblemWithDetail, ProblemCategory } from '@/types'
import { useState } from 'react'

export default function InputProblem({
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
  const [value, setValue] = useState<string | ''>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (value !== '') {
      handleAnswer(ProblemCategory.Input, p.id, p.questionId, Number(value))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', alignItems: 'center', marginLeft: '50em', gap: '10px' }}
    >
      <input
        type="text"
        value={value === null ? '' : value}
        onChange={(e) => {
          const inputValue = e.target.value
          if (inputValue === '') {
            setValue('')
          } else {
            setValue(inputValue)
          }
        }}
        placeholder="半角数字で入力"
        style={{ padding: '4px 8px', fontSize: '1em', border: '2px solid black' }}
      />
      <button
        onClick={() => {
          if (value !== '') {
            handleAnswer(ProblemCategory.Input, p.id, p.questionId, Number(value))
          }
        }}
        style={{
          padding: '6px 12px',
          fontSize: '1em',
          cursor: 'pointer',
          border: '2px solid #333', // 枠線の太さと色
          borderRadius: '4px', // 角の丸み
          backgroundColor: '#fff', // 背景色
        }}
      >
        送信
      </button>
    </form>
  )
}
