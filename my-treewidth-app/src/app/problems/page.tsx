"use client";

import { useState } from "react";

type Problem = {
  id: number;
  text: string;
  image: string;
};

export default function ProblemsPage() {
  // 現在の問題
  const [problem] = useState<Problem>({
    id: 2,
    text: "このグラフは木である。○か×か？",
    image: "/graph2.png",
  });

  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = async (answer: boolean) => {
    try {
      const res = await fetch("/api/check_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: problem.id,
          answer: answer,
        }),
      });

      const data = await res.json() as { correct?: boolean; error?: string };

      if (data.error) {
        setResult("エラー: " + data.error);
        return;
      }

      setResult(data.correct ? "正解！🎉" : "不正解❌");
    } catch (err) {
      console.error(err);
      setResult("通信エラーが発生しました");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">問題 {problem.id}</h2>

      <p className="mb-4">{problem.text}</p>
      <img
        src={problem.image}
        alt="問題画像"
        className="w-64 h-auto mb-6 border rounded"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleAnswer(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          ○
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          ×
        </button>
      </div>

      {result && (
        <div className="text-lg font-semibold">
          {result}
        </div>
      )}
    </div>
  );
}
