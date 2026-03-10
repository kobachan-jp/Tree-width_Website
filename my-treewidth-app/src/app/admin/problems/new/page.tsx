'use client'

import { useState } from 'react'
import { RenderFormFields } from '@/components/admin/problems/new/RenderFormFields'
import MakeGraph from '@/components/edit/MakeGraph'
import MakeTree from '@/components/edit/MakeTree'

export default function NewProblemPage() {
  const [text, setText] = useState('')

  // ラジオボタンの状態を管理 (true: 作成する, false: 作成しない)
  const [useGraph, setUseGraph] = useState(false)
  const [useTree, setUseTree] = useState(false)

  // グラフの切り替え処理
  const handleGraphChange = (val: boolean) => {
    setUseGraph(val)
    if (!val) {
      sessionStorage.removeItem('graph') // 「作成しない」なら即座に消去
    }
  }

  // 木の切り替え処理
  const handleTreeChange = (val: boolean) => {
    setUseTree(val)
    if (!val) {
      sessionStorage.removeItem('tree') // 「作成しない」なら即座に消去
    }
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
        <label style={{ display: 'block' }}>問題文</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            height: '100px',
            padding: '8px',
            // ここに枠線の指定を追加
            border: '2px solid black', // 太さ、種類、色を指定
            borderRadius: '4px', // 角を少し丸くすると綺麗です
            outline: 'none', // クリック時の青い枠を消したい場合
          }}
        />
      </div>

      {/* 3. 詳細設定コンポーネント */}
      <RenderFormFields />
    </div>
  )
}
