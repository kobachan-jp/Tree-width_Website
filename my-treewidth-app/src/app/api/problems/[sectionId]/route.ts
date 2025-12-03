import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ProblemCategory } from '@prisma/client/edge'
import { Problem } from '@/types'

//カテゴリ別に参照するテーブルを場合分けする
//関数を変える
const categoryHandlers = {
  TrueOrFalse: (questionId: number) =>
    prisma.trueOrFalse.findUnique({
      where: { id: questionId },
      include: {
        graph: {
          include: {
            nodes: true,
            edges: true,
          },
        },
        tree: {
          include: {
            nodes: true,
            edges: true,
          },
        },
      },
    }),
  Input: (questionId: number) =>
    prisma.input.findUnique({
      where: { id: questionId },
      include: {
        graph: {
          include: {
            nodes: true,
            edges: true,
          },
        },
        tree: {
          include: {
            nodes: true,
            edges: true,
          },
        },
      },
    }),
  Choice: (questionId: number) =>
    prisma.choice.findUnique({
      where: { id: questionId },
      include: {
        options: true,
        graph: {
          include: {
            nodes: true,
            edges: true,
          },
        },
        tree: {
          include: {
            nodes: true,
            edges: true,
          },
        },
      },
    }),
  //このオブジェクトの値とキーは変更されない定数とする
} as const

export async function GET(_: Request, { params }: { params: { sectionId: string } }) {
  const sectionId = Number(params.sectionId)
  const problems = await prisma.problem.findMany({
    where: { sectionId },
  })
  //ProblemCategory型を全て配列として取り出す
  const category = Object.values(ProblemCategory)

  const problemDetails = await Promise.all(
    problems.map(async (p: Problem) => {
      const handler = categoryHandlers[p.category]

      if (!handler) {
        throw new Error(`Not Found for Category: ${p.category}`)
      }

      const detail = await handler(p.questionId)

      return {
        ...p,
        detail,
      }
    }),
  )
  /*    
    //for文の簡単版reduce(関数,初期値)
    const categorized = category.reduce((acc,category)=>{
        acc[category] = problems.filter((p) => p.category === category);
        return acc;
    }, {} as Record<string, typeof problems>);


*/
  return NextResponse.json(problemDetails)
}

export async function POST(req: Request) {
  const { id, answer } = await req.json()
  const problem = await prisma.problem.findUnique({ where: { id } })

  if (!problem) {
    return NextResponse.json({ correct: false, message: '問題が見つかりません' })
  }

  const correct = problem.answer === answer
  return NextResponse.json({
    correct,
  })
}
