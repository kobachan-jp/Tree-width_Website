'use client'

type ReactFlowButtonProps = {
  onAction: () => void
  label?: string
}

export function ReactFlowButton({ onAction, label }: ReactFlowButtonProps) {
  return (
    <button className="button-press" onClick={onAction}>
      {label}
    </button>
  )
}
