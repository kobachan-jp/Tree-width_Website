import { ProblemWithDetail, ProblemCategory, Choice } from '@/types'
import React, { useState } from 'react'

interface Radio {
  label: string
  value: string
}
export default function ChoiceProblem({
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
  const [selected, setSelected] = useState('1')
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelected(event.target.value)

  const detail = p.detail as Choice

  const radioButtons: Radio[] = detail.options.map((i) => ({
    label: String(i.content),
    value: String(i.id),
  }))
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {radioButtons.map((radio) => {
        return (
          <div className="col-4" key={radio.value}>
            {/* checked属性に式を定義する */}
            <input
              className="form-check-input"
              type="radio"
              name="sweets"
              value={radio.value}
              checked={radio.value === selected}
              onChange={changeValue}
            />
            <label className="form-check-label">
              <span className="fs-6">{radio.label}</span>
            </label>
          </div>
        )
      })}
      <button
        onClick={() => {
          handleAnswer(ProblemCategory.Choice, p.id, p.questionId, Number(selected))
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
