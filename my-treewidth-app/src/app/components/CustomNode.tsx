"use client"
import React from "react"
import { Handle, Position, NodeProps } from "reactflow"

// ✅ NodeProps 型を明示的に使う
export default function CustomNode({ data, selected }: NodeProps) {
  return (
    <div
      style={{
        background: selected ? "#FFD700" : "#89CFF0",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        color: "#000",
        position: "relative",
      }}
    >
      {data.label}

      {/* ▼ 中央の透明なハンドル（source） */}
      <Handle
        type="source"
        id="center"
        position={Position.Right} 
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",//中心設定（自分の分も中心調整する)
          background: "transparent",//背景透明科
          border: "none",//枠線なし
        }}
      />

      {/* ▼ 中央の透明なハンドル（target） */}
      <Handle
        type="target"
        id="center"
        position={Position.Left}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "transparent",
          border: "none",
        }}
      />
    </div>
  )
}
