'use client'

import { ProblemCategory } from '@/types'
import { useState } from 'react'

export default function CreateProblemPage() {
  const [category, setCategory] = useState<ProblemCategory | null>(null)

  const ProblemCategoryLabel: Record<ProblemCategory, string> = {
    [ProblemCategory.TrueOrFalse]: '○×問題',
    [ProblemCategory.Input]: '入力問題',
    [ProblemCategory.Choice]: '選択問題',
  }

  return (
    <div>
      <h1>問題作成ページ</h1>

      <select
        value={category ?? ''}
        onChange={(e) => setCategory(e.target.value as ProblemCategory)}
      >
        <option value="" disabled>
          カテゴリを選択
        </option>

        {Object.values(ProblemCategory).map((c) => (
          <option key={c} value={c}>
            {ProblemCategoryLabel[c]}
          </option>
        ))}
      </select>

      {category === ProblemCategory.Choice && <ChoiceForm />}
      {category === ProblemCategory.Input && <InputForm />}
      {category === ProblemCategory.TrueOrFalse && <TrueOrFalseForm />}
    </div>
  )
}
