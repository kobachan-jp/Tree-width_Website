import { ProblemWithDetail ,ProblemCategory} from '@/types'
import { useState } from 'react'

export default function InputProblem({
  p,
  handleAnswer,
}: {
  p: ProblemWithDetail
  handleAnswer: (category:ProblemCategory,id: number, answer: number) => void
}) {
  const [value, setValue] = useState<number | ''>('')

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        placeholder="回答を入力"
        style={{ padding: '4px 8px', fontSize: '1em' }}
      />
      <button
        onClick={() => {
          if (value !== '') {
            handleAnswer(ProblemCategory.Input,p.id, Number(value))
            setValue('') // 送信後に入力欄をクリアする場合
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
    </div>
  )
}
