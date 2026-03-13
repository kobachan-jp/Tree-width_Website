'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConfirmGraph from '@/components/edit/confirm/ConfirmGraph'
import ConfirmTree from '@/components/edit/confirm/ConfirmTree'
import { ChoiceOption } from '@/components/admin/problems/new/ChoiceForm'

export default function ConfirmPage() {
  const router = useRouter()

  // 表示用のステート
  const [text, setText] = useState('')
  const [choices, setChoice] = useState<ChoiceOption[]>([])
  const [answer, setAnswer] = useState<number>()
  const [hasGraph, setHasGraph] = useState(false)
  const [hasTree, setHasTree] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. sessionStorage からデータを読み込む
    const savedText = sessionStorage.getItem('problem_text') || ''
    const savedUseGraph = JSON.parse(sessionStorage.getItem('use_graph') || 'false')
    const savedUseTree = JSON.parse(sessionStorage.getItem('use_tree') || 'false')
    const choices = JSON.parse(sessionStorage.getItem('problem_choices') || '[]')
    const answer = Number(sessionStorage.getItem('problem_answer'))

    setText(savedText)
    setHasGraph(savedUseGraph)
    setHasTree(savedUseTree)
    setLoading(false)
    setChoice(choices)
    setAnswer(answer)
  }, [])

  // 最終的な登録処理
  const handleFinalRegister = async () => {
    // 2. すべてのデータをまとめてオブジェクトにする
    const finalData = {
      text,
      choices,
      answer,
      graph: hasGraph ? JSON.parse(sessionStorage.getItem('graph') || 'null') : null,
      tree: hasTree ? JSON.parse(sessionStorage.getItem('tree') || 'null') : null,
      // RenderFormFields のデータも必要なら追加
    }

    console.log('DBに登録するデータ:', finalData)

    // 3. APIに送信（後ほどAPI Routeを作成する必要があります）
    /*
    const res = await fetch('/api/problems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    })
    if (res.ok) {
      alert('登録が完了しました！')
      sessionStorage.clear()
      router.push('/admin/problems')
    }
    */
    alert('（デバッグ用）コンソールにデータを出力しました')
  }

  if (loading) return <div style={{ padding: '40px' }}>読み込み中...</div>

  // ... 上部のステート管理などはそのままでOK ...

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>登録内容の確認</h1>

      {/* 問題文の確認 */}
      <section
        style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}
      >
        <h3>問題文</h3>
        <div style={{ whiteSpace: 'pre-wrap', background: '#f9f9f9', padding: '15px' }}>
          {text || '（未入力）'}
        </div>
      </section>

      {/* --- 追加：選択問題の場合の表示 --- */}
      {choices.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <h3>選択肢の確認</h3>
          {choices.map((c: any, i: number) => (
            <div
              key={i}
              style={{
                padding: '10px',
                border: c.content === answer ? '2px solid #32CD32' : '1px solid #ccc',
                marginBottom: '5px',
                backgroundColor: c.content === answer ? '#f0fff0' : 'white',
              }}
            >
              {i + 1}. {c.content} {c.content === answer && <strong>(正解)</strong>}
            </div>
          ))}
        </section>
      )}

      {/* グラフ構造の確認 */}
      {hasGraph && (
        <section style={{ marginBottom: '30px' }}>
          <h3>グラフ構造</h3>
          <ConfirmGraph />
        </section>
      )}

      {/* 木構造の確認 */}
      {hasTree && (
        <section style={{ marginBottom: '30px' }}>
          <ConfirmTree />
        </section>
      )}

      {/* 操作ボタン */}
      <div style={{ marginTop: '50px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '12px 30px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          修正に戻る
        </button>

        <button
          onClick={handleFinalRegister}
          style={{
            padding: '12px 50px',
            backgroundColor: '#32CD32',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          この内容で登録する
        </button>
      </div>
    </div>
  )
}
