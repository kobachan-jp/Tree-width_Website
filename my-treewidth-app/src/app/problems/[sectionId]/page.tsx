'use client'

import { useEffect, useState } from 'react'
import { Problem, ProblemCategory, ProblemWithDetail } from '@/types'

export default function ProblemsPage() {
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
  async function handleAnswer(id: number, answer: number) {
    const res = await fetch('/api/problems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, answer }),
    })
    const data = await res.json()
    setMessages((prev) => ({
      //全プロパティをコピー（既存の回答状況をコピー）
      ...prev,
      //新たに正答判定を追加
      [id]: data.correct,
    }))
  }

  /*
    case ProblemCategory.Choice:
      return (
        <div>
          {p.choice?.map((choice, idx) => (
            <button key={idx} onClick={() => handleAnswer(p.id,idx)}>
              {choice}
            </button>
          ))}
        </div>
      );
*/

  return (
    <div style={{ padding: 20 }}>
      <h1>◎× 問題</h1>

      {problems.map((p) => (
        <div key={p.id} style={{ marginBottom: 30 }}>
          <p>問題{p.id}</p>
          <p>{p.detail.text}</p>
          {p.image && <img src={p.image} alt="問題画像" width={200}></img>}
          {renderAnswerUI(p)}
          {/*回答判定されている場合のみ判定結果を出力 */}
          {messages[p.id] !== undefined && <h3>{messages[p.id] ? '正解！' : '不正解'}</h3>}
        </div>
      ))}
    </div>
  )
}
