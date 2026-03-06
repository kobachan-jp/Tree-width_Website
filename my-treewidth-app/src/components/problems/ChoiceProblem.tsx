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
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // ★ これで縦並びになる
          alignItems: 'flex-start', // ★ 左揃えにする（中央にしたい場合は 'center'）
          justifyContent: 'center',
          margin: '0 auto 2em', // ★ 中央寄せ (上下 左右 下の余白)
          gap: '20px', // ★ 選択肢ごとの間隔
          fontSize: '24px',
        }}
      >
        {radioButtons.map((radio) => {
          return (
            <div className="col-4" key={radio.value} style={{ flex: 1 }}>
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
      </div>
      <div style={{ textAlign: 'right', marginRight: '14em' }}>
        <button
          className="problem-button"
          onClick={() => {
            handleAnswer(ProblemCategory.Choice, p.id, p.questionId, Number(selected))
          }}
        >
          送信
        </button>
      </div>
    </div>
  )
}
