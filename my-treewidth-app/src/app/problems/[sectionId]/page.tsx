'use client'
import { useParams } from 'next/navigation'
import { ProblemCategory } from '@prisma/client'
import { useEffect, useState } from 'react'
import { ProblemWithDetail } from '@/types'
import ProblemList from '@/app/components/problems/ProblemList'
import { useRouter } from 'next/navigation'

export default function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemWithDetail[]>([])
  const [messages, setMessages] = useState<{ [id: number]: boolean | undefined }>({})

  const [hasNext, setHasNext] = useState(false) // ←★追加
  const [hasPrev, setHasPrev] = useState(false) // ←★追加（必要なら）

  const params = useParams<{ sectionId: string }>()
  const sectionId = Number(params.sectionId)
  const router = useRouter()

  // --- 問題取得 ---
  useEffect(() => {
    fetch(`/api/problems/${sectionId}`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data)
        setMessages({})
      })
  }, [sectionId])

  // --- 次・前セクション存在チェック ---
  useEffect(() => {
    const next = sectionId + 1
    const prev = sectionId - 1

    // 次のセクションが存在するか
    fetch(`/api/sections/${next}`)
      .then((res) => setHasNext(res.ok))
      .catch(() => setHasNext(false))

    // 前のセクションが存在するか（1以下なら false）
    if (prev <= 0) {
      setHasPrev(false)
    } else {
      fetch(`/api/sections/${prev}`)
        .then((res) => setHasPrev(res.ok))
        .catch(() => setHasPrev(false))
    }
  }, [sectionId])

  // --- 回答送信 ---
  async function handleAnswer(
    category: ProblemCategory,
    problemId: number,
    questionId: number,
    answer: number,
  ) {
    const res = await fetch(`/api/problems/${sectionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, questionId, answer }),
    })
    const data = await res.json()
    setMessages((prev) => ({ ...prev, [problemId]: data.correct }))
  }

  // --- 移動 ---
  const handleNext = (e: any) => {
    e.preventDefault()
    if (hasNext) router.push(`/problems/${sectionId + 1}`)
  }

  const handlePrev = (e: any) => {
    e.preventDefault()
    if (hasPrev) router.push(`/problems/${sectionId - 1}`)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '2em',
          marginBottom: '30px',
        }}
      >
        Section {sectionId}
      </h1>

      <ProblemList problems={problems} messages={messages} handleAnswer={handleAnswer} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '5em',
          justifyContent: 'space-between',
        }}
      >
        {/* Prev ボタン */}
        {hasPrev ? (
          <form onSubmit={handlePrev}>
            <button className="button-press" type="submit">
              Prev
            </button>
          </form>
        ) : (
          <div></div>
        )}

        {/* Next ボタン */}
        {hasNext && (
          <form onSubmit={handleNext}>
            <button className="button-press" type="submit">
              Next
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
