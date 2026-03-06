'use client'
import { useParams } from 'next/navigation'
import { ProblemCategory } from '@prisma/client'
import { useEffect, useState } from 'react'
import { ProblemWithDetail } from '@/types'
import ProblemList from '@/components/problems/ProblemList'
import { useRouter } from 'next/navigation'

export default function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemWithDetail[]>([])
  const [messages, setMessages] = useState<{ [id: number]: boolean | undefined }>({})

  const [hasNext, setHasNext] = useState(false) // ←★追加
  const [hasPrev, setHasPrev] = useState(false) // ←★追加（必要なら）

  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const router = useRouter()

  // --- 問題取得 ---
  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data)
        setMessages({})
      })
  }, [id])

  // --- 次・前セクション存在チェック ---
  useEffect(() => {
    const next = id + 1
    const prev = id - 1

    // 次のセクションが存在するか
    fetch(`/api/problems/${next}`)
      .then((res) => setHasNext(res.ok))
      .catch(() => setHasNext(false))

    // 前のセクションが存在するか（1以下なら false）
    if (prev <= 0) {
      setHasPrev(false)
    } else {
      fetch(`/api/problems/${prev}`)
        .then((res) => setHasPrev(res.ok))
        .catch(() => setHasPrev(false))
    }
  }, [id])

  // --- 回答送信 ---
  async function handleAnswer(
    category: ProblemCategory,
    problemId: number,
    questionId: number,
    answer: number,
  ) {
    const res = await fetch(`/api/problems/${id}`, {
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
    if (hasNext) router.push(`/problems/${id + 1}`)
  }

  const handlePrev = (e: any) => {
    e.preventDefault()
    if (hasPrev) router.push(`/problems/${id - 1}`)
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
        Section {id}
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
