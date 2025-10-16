import {NextResponse} from "next/server";

export const problems = [
    {
        id:1,
        question:"このグラフは木ですか？",
        //画像はpublicディレクトリに
        //image:"/images/question1.png",
        answer:true
    },
    {
    id: 2,
    question: "このグラフは連結ですか？",
    answer: false
  }
];

export async function GET(){
    return NextResponse.json(problems);
}