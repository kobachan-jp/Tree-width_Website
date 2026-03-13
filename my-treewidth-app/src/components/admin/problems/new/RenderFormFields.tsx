'use client'

import { useState, useEffect } from 'react'
import { ProblemCategory } from '@/types'
import { ChoiceForm, ChoiceOption } from './ChoiceForm'

export function RenderFormFields() {
  const [category, setCategory] = useState<ProblemCategory | ''>('')
  const [answer, setAnswer] = useState<number | ''>('')
  const [text, setText] = useState<string>('')
  const [options, setOptions] = useState<ChoiceOption[]>([])
  // RenderFormFields.tsx の中にこれを追加
  useEffect(() => {
  // リロードされたとき、ストレージから値を引っ張り出す
  const savedCategory = sessionStorage.getItem('problem_category');
  const savedText = sessionStorage.getItem('problem_text');
  
  if (savedCategory) {
    setCategory(savedCategory as ProblemCategory);
  }
  // テキストなども同様に復元
  if (savedText) {
    setText(savedText);
  }
  
  // 選択肢データの復元も忘れずに！
  const savedChoices = sessionStorage.getItem('problem_choices');
  if (savedChoices) {
    setOptions(JSON.parse(savedChoices))
  }
}, []); // この [] が「コンポーネントが読み込まれたとき（リロード時含む）1回だけ実行」という合図です

  // カテゴリごとに異なる入力フィールドを切り替えて表示
  const FormFields = () => {
    switch (category) {
      case ProblemCategory.TrueOrFalse:
        return (
          <div className="field-group">
            <label>正解 (True=1, False=0): </label>
            <input
              type="number"
              value={answer}
              onChange={(e) => updateAnswer(e.target.value)}
              min="0"
              max="1"
              placeholder="0 or 1"
            />
          </div>
        )
      case ProblemCategory.Input:
        return (
          <div className="field-group">
            <label>数値による回答: </label>
            <input
              type="number"
              value={answer}
              onChange={(e) => updateAnswer(e.target.value)}
              placeholder="解答を入力"
            />
          </div>
        )
      case ProblemCategory.Choice:
        return (
          <ChoiceForm
            onUpdate={(options) => {
              // 1. 選択肢全体を保存
              sessionStorage.setItem('problem_choices', JSON.stringify(options))

              // 2. 正解のデータを特定して保存
              const correctAnswer = options.find((opt) => opt.isCorrect)?.id
              if (correctAnswer) {
                sessionStorage.setItem('problem_answer', correctAnswer.toString())
              }
            }}
          />
        )
      default:
        return <p>カテゴリを選択すると詳細設定が表示されます。</p>
    }
  }

  //カテゴリ変更ごとにanswerとストレージをリセット
  const handleCategoryChange = (val: ProblemCategory) => {
    setCategory(val)
    setAnswer('')
    sessionStorage.removeItem('problem_answer')
    sessionStorage.setItem('problem_category', val)
  }

  //入力値が変わったときにアップデート
  const updateAnswer = (val: string) => {
    const numValue = val === '' ? '' : Number(val)
    setAnswer(numValue)
    sessionStorage.setItem('problem_answer', val)
  }

  return (
    <div style={{ padding: '40px' }}>
      {/* 1. カテゴリ選択 */}
      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value as ProblemCategory)}
      >
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
