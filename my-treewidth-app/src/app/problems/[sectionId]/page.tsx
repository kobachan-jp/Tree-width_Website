'use client'
import { useParams } from 'next/navigation'
import { ProblemCategory } from '@prisma/client'
import { useEffect, useState } from 'react'
import { ProblemWithDetail } from '@/types'
import ProblemList from '@/app/components/problems/ProblemList'
import { useRouter } from 'next/navigation'

export default function ProblemsPage() {
  //問題の配列を状態管理
  const [problems, setProblems] = useState<ProblemWithDetail[]>([])
  //正答判定をProblem.idをキーとするmapでbooleanまたはundefinedを管理
  const [messages, setMessages] = useState<{ [id: number]: boolean | undefined }>({})

  const params = useParams<{ sectionId: string }>()
  const sectionId = Number(params.sectionId)
  //GETリクエストで問題一覧を取得.
  useEffect(() => {
    fetch(`/api/problems/${sectionId}`)
      //fetchはレスポンスオブジェクトを返すのでJSON型に変換.
      .then((res) => res.json())
      .then((data) => {
        setProblems(data)
        setMessages({}) //Sectionごとに回答保持をリセット（保存したければコメントアウト）
      })
  }, [sectionId])

  //回答を送信し、正答判定を取得
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
    setMessages((prev) => ({
      //全プロパティをコピー（既存の回答状況をコピー）
      ...prev,
      //新たに正答判定を追加
      [problemId]: data.correct,
    }))
  }

  const router = useRouter()

  const handleNext = (e: any) => {
    e.preventDefault()
    router.push(`/problems/${sectionId + 1}`)
  }

  const handlePrev = (e: any) => {
    e.preventDefault()
    router.push(`/problems/${sectionId - 1}`)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '2em', // 文字の大きさを調整
          marginBottom: '30px',
        }}
      >
        Section{sectionId}
      </h1>
      <ProblemList
        problems={problems}
        messages={messages}
        handleAnswer={handleAnswer}
      ></ProblemList>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '5em',
          justifyContent: 'space-between',
        }}
      >
        <form onSubmit={handlePrev}>
          <button className="button-press" type="submit">
            Prev
          </button>
        </form>

        <form onSubmit={handleNext}>
          <button className="button-press" type="submit">
            Next
          </button>
        </form>
      </div>
    </div>
  )
}
