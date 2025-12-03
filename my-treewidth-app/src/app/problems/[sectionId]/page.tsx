'use client'
import { ProblemCategory } from '@prisma/client'
import { useEffect, useState } from 'react'
import { ProblemWithDetail} from '@/types'
import ProblemList from '@/app/components/problems/ProblemList'

export default function ProblemsPage({params}:{params:{sectionId:string}}) {
  //問題の配列を状態管理
  const [problems, setProblems] = useState<ProblemWithDetail[]>([])
  //正答判定をProblem.idをキーとするmapでbooleanまたはundefinedを管理
  const [messages, setMessages] = useState<{ [id: number]: boolean | undefined }>([])

  //GETリクエストで問題一覧を取得.
  useEffect(() => {
    fetch('/api/problems/${sectionId}')
      //fetchはレスポンスオブジェクトを返すのでJSON型に変換.
      .then((res) => res.json())
      .then((data) => setProblems(data))
  }, [])
  //回答を送信し、正答判定を取得
  async function handleAnswer(category:ProblemCategory,id: number, answer: number) {
    const res = await fetch('/api/problems/${sectionId}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category,id, answer }),
    })
    const data = await res.json()
    setMessages((prev) => ({
      //全プロパティをコピー（既存の回答状況をコピー）
      ...prev,
      //新たに正答判定を追加
      [id]: data.correct,
    }))
  }

  const sectionId = Number(params.sectionId);
  return (
    <div style={{ padding: 20 }}>
      <h1>問題{sectionId}</h1>
      <ProblemList problems={problems} messages={messages} handleAnswer={handleAnswer}></ProblemList>
    </div>
  )
}
