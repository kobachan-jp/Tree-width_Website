'use client'
import React from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

// ✅ NodeProps 型を明示的に使う
export default function CustomTreeNode({ data, selected }: NodeProps) {
  return (
    <div
      style={{
        background: selected ? '#FF69B4' : '#32CD32',
        width: 45,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transform: 'rotate(45deg)', // 親を45度回転
      }}
    >
      {/* ▼ テキストを逆方向に45度回転させて水平に戻す */}
      <div style={{ transform: 'rotate(-45deg)', fontWeight: 'normal', color: '#000' }}>
        {data.label}
      </div>

      {/* ▼ 中央の透明なハンドル（source） */}
      <Handle
        type="source"
        id="center"
        position={Position.Right}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', //中心設定（自分の分も中心調整する)
          background: 'transparent', //背景透明科
          border: 'none', //枠線なし
        }}
      />

      {/* ▼ 中央の透明なハンドル（target） */}
      <Handle
        type="target"
        id="center"
        position={Position.Left}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          border: 'none',
        }}
      />
    </div>
  )
}
