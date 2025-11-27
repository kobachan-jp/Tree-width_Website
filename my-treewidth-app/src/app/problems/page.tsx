"use client";

import { useEffect, useState } from "react";
import { Problem, ProblemCategory } from "@/types";


export default function ProblemsPage(){
  //問題の配列を状態管理
  const [problems, setProblems] = useState<Problem[]>([]);
  //正答判定をProblem.idをキーとするmapでbooleanまたはundefinedを管理
  const [messages,setMessages] = useState<{[id:number]:boolean | undefined}>([]);

  //GETリクエストで問題一覧を取得.
  useEffect(() => {
    fetch("/api/problems")
    //fetchはレスポンスオブジェクトを返すのでJSON型に変換.
    .then((res) => res.json())
    .then((data) => setProblems(data));
  },[]);
  //回答を送信し、正答判定を取得
  async function handleAnswer(id: number,answer: number) {
    const res = await fetch("/api/problems",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id,answer}),
    });
    const data = await res.json();
    setMessages((prev) => ({
      //全プロパティをコピー（既存の回答状況をコピー）
      ...prev,
      //新たに正答判定を追加
      [id]:data.correct,
    }))
    
  }

  function InputProblem({ p, handleAnswer }: { p: Problem; handleAnswer: (id: number, answer: number) => void }) {
  // 入力欄の値を一時的に保持する
  const [inputValue, setInputValue] = useState<number | "">("");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        placeholder="回答を入力"
        style={{ padding: "4px 8px", fontSize: "1em" }}
      />
      <button
        onClick={() => {
          if (inputValue !== "") {
            handleAnswer(p.id, Number(inputValue));
            setInputValue(""); // 送信後に入力欄をクリアする場合
          }
        }}
        style={{
           padding: "6px 12px", 
           fontSize: "1em", 
           cursor: "pointer",
           border: "2px solid #333", // 枠線の太さと色
           borderRadius: "4px",       // 角の丸み
           backgroundColor: "#fff",   // 背景色
     }}
      >
        送信
      </button>
    </div>
  );
}

  function renderAnswerUI(p:Problem){
    switch (p.category){
      case ProblemCategory.TrueOrFalse:
        return(
          <div>
            <button onClick={() => handleAnswer(p.id,1)} 
            style={{
               padding: "4px 10px", 
               fontSize: "1em", 
               cursor: "pointer",
               border: "2px solid #333", // 枠線の太さと色
              borderRadius: "4px",       // 角の丸み
              backgroundColor: "#df1111ff",   // 背景色 
            }} >○</button> 
            <button onClick={() => handleAnswer(p.id,0)} 
            style={{
               padding: "4px 10px", 
               fontSize: "1em", 
               cursor: "pointer",
               border: "2px solid #333", // 枠線の太さと色
              borderRadius: "4px",       // 角の丸み
              backgroundColor: "#3acfe2ff",   // 背景色 
            }} >×</button>
          </div>
        );

    case ProblemCategory.Input:
      return <InputProblem p={p} handleAnswer={handleAnswer} />;
{/*
    case ProblemCategory.Choice:
      return (
        <div>
          {p.choice?.map((choice, idx) => (
            <button key={idx} onClick={() => handleAnswer(p.id,idx)}>
              {choice}
            </button>
          ))}
        </div>
      );
*/}
      default:
        return null;
    }
  }

return(
  <div style={{padding: 20}}>
    <h1>◎× 問題</h1>

    {problems.map((p) => (
      <div key={p.id} style={{marginBottom: 30}}>
        <p>問題{p.id}</p>
        <p>{p.text}</p>
        {p.image && <img src={p.image} alt="問題画像" width={200}></img>}
        {renderAnswerUI(p)}
        {/*回答判定されている場合のみ判定結果を出力 */}
        {messages[p.id] !== undefined && (
        <h3>{messages[p.id] ? "正解！" : "不正解"}</h3>
        )}
  </div>
)
)}

  </div>
);
}
