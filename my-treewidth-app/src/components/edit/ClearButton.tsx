'use client'

type ClearButtonProps = {
  onClear: () => void
  label?: string
}

export function ClearButton({ onClear, label }: ClearButtonProps) {
  return (
    <button className="button-press" onClick={onClear}>
      {label}
    </button>
  )
}
