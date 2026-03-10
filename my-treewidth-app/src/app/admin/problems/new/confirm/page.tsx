'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConfirmPage() {
  const [data, setData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const saved = sessionStorage.getItem('temp_problem_data')
    if (!saved) {
      router.push('/admin/problems/new') // データがなければ作成画面に戻す
    } else {
      setData(JSON.parse(saved))
    }
  }, [router])

  const handleRegister = async () => {
    // サーバーへの送信処理
    const res = await fetch('/api/problems', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (res.ok) {
      sessionStorage.removeItem('temp_problem_data')
      alert('登録完了しました！')
      router.push('/admin/problems')
    }
  }

  if (!data) return <div>読み込み中...</div>

  return (
    <div style={{ padding: '40px' }}>
      <h1>確認画面</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button onClick={() => router.back()}>修正する</button>
      <button onClick={handleRegister}>この内容で登録する</button>
    </div>
  )
}
