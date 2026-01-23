'use client'

import { Handle, Position, NodeProps } from 'reactflow'
import styles from './editCustomNode.module.css'
import { CustomNodeData } from '@/hooks/useGraph'

type Props = NodeProps<CustomNodeData> & {
  // onChangeLabel が id と label を受け取ることを明示
  onChangeLabel: (id: string, label: string) => void
}

export default function EditCustomNode({ id, data, selected, onChangeLabel }: Props) {
  const handleDoubleClick = (e: React.MouseEvent) => {
    // ReactFlow側のダブルクリックイベントと衝突しないよう伝播を止める
    e.stopPropagation()

    const newLabel = prompt('ノード名を入力', data.label)
    if (newLabel !== null && newLabel.trim() !== '') {
      onChangeLabel(id, newLabel)
    }
  }

  return (
    <div
      className={`${styles.node} ${selected ? styles.selected : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      {data.label}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  )
}
