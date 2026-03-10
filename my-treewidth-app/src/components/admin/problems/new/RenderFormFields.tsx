'use client'

import { useState } from 'react'
import { ProblemCategory } from '@/types'
import { ChoiceForm } from './ChoiceForm'

export function RenderFormFields() {
  const [category, setCategory] = useState<ProblemCategory | ''>('')

  // カテゴリごとに異なる入力フィールドを切り替えて表示
  const FormFields = () => {
    switch (category) {
      case ProblemCategory.TrueOrFalse:
        return (
          <div className="field-group">
            <label>正解 (True=1, False=0): </label>
            <input type="number" min="0" max="1" placeholder="0 or 1" />
          </div>
        )
      case ProblemCategory.Input:
        return (
          <div className="field-group">
            <label>数値による回答: </label>
            <input type="number" placeholder="解答を入力" />
          </div>
        )
      case ProblemCategory.Choice:
        return (
          <ChoiceForm
            onUpdate={(options) => {
              // ここで親のステートに options を保持する
              console.log('現在の選択肢データ:', options)
            }}
          />
        )
      default:
        return <p>カテゴリを選択すると詳細設定が表示されます。</p>
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      {/* 1. カテゴリ選択 */}
      <select value={category} onChange={(e) => setCategory(e.target.value as ProblemCategory)}>
        <option value="">カテゴリを選択してください</option>
        {Object.values(ProblemCategory).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* 2. 動的フォーム */}
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px' }}>
        {FormFields()}
      </div>
    </div>
  )
}
