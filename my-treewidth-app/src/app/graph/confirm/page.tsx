'use client'

import { useRouter } from 'next/navigation'
import ConfirmGraph from '@/components/edit/confirm/ConfirmGraph'
import ConfirmTree from '@/components/edit/confirm/ConfirmTree'

export default function Confirm() {
  const router = useRouter()
  return (
    <main>
      <ConfirmGraph />
      <ConfirmTree />
      <button className="button-press" onClick={() => router.back()}>
        戻る
      </button>
    </main>
  )
}
