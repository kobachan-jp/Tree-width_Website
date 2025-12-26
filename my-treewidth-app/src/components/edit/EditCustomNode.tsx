'use client'

import { Handle, Position, NodeProps, EdgeLabelRenderer } from 'reactflow'
import styles from './editCustomNode.module.css'

export default function EditCustomNode({ data, selected }: NodeProps) {
  return (
    <div className={`${styles.node} ${selected ? styles.selected : ''}`}>
      {data.label}

      <Handle
        type="source"
        id="source"
        position={Position.Bottom}
        className={styles.sourceHandle}
      />

      <Handle type="target" id="target" position={Position.Top} className={styles.targetHandle} />
    </div>
  )
}
