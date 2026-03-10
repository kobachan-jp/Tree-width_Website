'use client'

import { useState } from 'react'

export type ChoiceOption = {
  id: number
  content: string
  isCorrect: boolean
}

export function ChoiceForm({ onUpdate }: { onUpdate: (options: ChoiceOption[]) => void }) {
  const [options, setOptions] = useState<ChoiceOption[]>([
    { id: Date.now(), content: '', isCorrect: true },
  ])

  // 更新があるたびに親へ通知するヘルパー
  const updateOptions = (newOptions: ChoiceOption[]) => {
    setOptions(newOptions)
    onUpdate(newOptions) // 親へデータを渡す
  }

  const addOption = () => {
    updateOptions([...options, { id: Date.now(), content: '', isCorrect: false }])
  }

  const removeOption = (id: number) => {
    updateOptions(options.filter((opt) => opt.id !== id))
  }

  const updateContent = (id: number, content: string) => {
    updateOptions(options.map((opt) => (opt.id === id ? { ...opt, content } : opt)))
  }

  const setCorrect = (id: number) => {
    // 正解を1つにするために他をすべてfalseにする
    updateOptions(options.map((opt) => ({ ...opt, isCorrect: opt.id === id })))
  }

  return (
    <div className="field-group">
      <label>選択肢の設定: </label>
      {options.map((opt, index) => (
        <div
          key={opt.id}
          style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}
        >
          <span>{index + 1}.</span>
          <input
            type="radio"
            checked={opt.isCorrect}
            onChange={() => setCorrect(opt.id)}
            title="正解にする"
          />
          <input
            type="text"
            value={opt.content}
            onChange={(e) => updateContent(opt.id, e.target.value)}
            placeholder="選択肢の内容"
          />
          <button type="button" onClick={() => removeOption(opt.id)}>
            削除
          </button>
        </div>
      ))}
      <button type="button" onClick={addOption}>
        + 選択肢を追加
      </button>
    </div>
  )
}
