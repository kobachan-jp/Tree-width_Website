'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // 追加
import { RenderFormFields } from '@/components/admin/problems/new/RenderFormFields'
import MakeGraph from '@/components/edit/MakeGraph'
import MakeTree from '@/components/edit/MakeTree'

export default function NewProblemPage() {
  const router = useRouter() // routerを使えるようにする
  const [text, setText] = useState('')

  // ラジオボタンの状態を管理 (true: 作成する, false: 作成しない)
  const [useGraph, setUseGraph] = useState(false)
  const [useTree, setUseTree] = useState(false)

  // グラフの切り替え処理
  const handleGraphChange = (val: boolean) => {
    setUseGraph(val)
    if (!val) {
      sessionStorage.removeItem('graph')
    }
  }

  // 木の切り替え処理
  const handleTreeChange = (val: boolean) => {
    setUseTree(val)
    if (!val) {
      sessionStorage.removeItem('tree')
    }
  }

  // ★ 追加：確認画面へ遷移する関数
  const handleGoToConfirm = () => {
    // sessionStorageに「グラフ・木を使うかどうか」と「問題文」を保存
    sessionStorage.setItem('use_graph', JSON.stringify(useGraph))
    sessionStorage.setItem('use_tree', JSON.stringify(useTree))
    sessionStorage.setItem('problem_text', text)

    // 確認画面（confirmページ）に飛ばす
    router.push('/admin/problems/confirm')
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>問題作成</h1>

      {/* 1. グラフ作成エリア */}
      <div style={{ marginBottom: '30px', border: '1px solid #eee', padding: '15px' }}>
        <h3>グラフ構造</h3>
        <label style={{ marginRight: '20px' }}>
          <input type="radio" checked={!useGraph} onChange={() => handleGraphChange(false)} />{' '}
          作成しない
        </label>
        <label>
          <input type="radio" checked={useGraph} onChange={() => handleGraphChange(true)} />{' '}
          作成する
        </label>

        {useGraph && (
          <div style={{ marginTop: '15px' }}>
            <MakeGraph />
          </div>
        )}
      </div>

      {/* 2. 木構造作成エリア */}
      <div style={{ marginBottom: '30px', border: '1px solid #eee', padding: '15px' }}>
        <h3>木構造</h3>
        <label style={{ marginRight: '20px' }}>
          <input type="radio" checked={!useTree} onChange={() => handleTreeChange(false)} />{' '}
          作成しない
        </label>
        <label>
          <input type="radio" checked={useTree} onChange={() => handleTreeChange(true)} /> 作成する
        </label>

        {useTree && (
          <div style={{ marginTop: '15px' }}>
            <MakeTree />
          </div>
        )}
      </div>

      {/* 問題文セクション */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>問題文</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            height: '100px',
            padding: '8px',
            border: '2px solid black',
            borderRadius: '4px',
            outline: 'none',
          }}
        />
      </div>

      {/* 3. 詳細設定コンポーネント */}
      <RenderFormFields />

      {/* ★ 追加：確認画面へのボタン */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button
          onClick={handleGoToConfirm}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#32CD32',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          確認画面へ
        </button>
      </div>
    </div>
  )
}
