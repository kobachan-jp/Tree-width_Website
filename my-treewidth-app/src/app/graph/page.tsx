'use client'

import { useRouter } from 'next/navigation'
import MakeGraph from '@/components/edit/MakeGraph'
import MakeTree from '@/components/edit/MakeTree'
/* ------------------
     確認画面へ遷移
  ------------------ */

export default function NewPage() {
  const router = useRouter()
  const goConfirm = () => {
    sessionStorage.setItem('needs_restore', 'true')
    router.push('/graph/confirm')
  }

  return (
    <main>
      <section>
        <h1>グラフ構造</h1>
        <div>
          <MakeGraph />
        </div>
      </section>
      <section>
        <h1>木構造</h1>
        <div>
          <MakeTree />
        </div>
      </section>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button
          className="button-press"
          onClick={goConfirm}
          style={{
            padding: '15px 40px',
            fontSize: '1.2rem',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          すべての内容を確認する
        </button>
      </div>
    </main>
  )
}
