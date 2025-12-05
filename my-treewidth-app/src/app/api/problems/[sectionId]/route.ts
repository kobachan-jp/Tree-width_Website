import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Problem, ProblemCategory } from '@/types'

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
            edges:true,
/*            edges: {
                select: {
                id: true,
                edgeKey: true,
                // ReactFlowに必要な外部キーを確実に取得
                sourceId: true,
                targetId: true,
                // Edge モデルにある他の必要なフィールドもすべて true で指定
              },

            },              */
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

export async function GET(_: Request, props: { params: Promise<{ sectionId: string }> }) {
  const resolvedParams = await props.params
  const sectionId = Number(resolvedParams.sectionId)
  console.log(sectionId)
  /*
  if (isNaN(sectionId) || sectionId <= 0) {
      return NextResponse.json({ error: '無効な Section ID です' }, { status: 400 });
  }
*/
  const problems = await prisma.problem.findMany({
    where: { sectionId },
  })
  //ProblemCategory型を全て配列として取り出す
  const category = Object.values(ProblemCategory)

  const problemDetails = await Promise.all(
    problems.map(async (p) => {
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

  return NextResponse.json(problemDetails)
}

export async function POST(req: Request) {
  const { category, id, answer } = await req.json()
  let problem
  switch (category) {
    case ProblemCategory.TrueOrFalse:
      problem = await prisma.trueOrFalse.findUnique({
        where: { id },
      })
      break

    case ProblemCategory.Input:
      problem = await prisma.input.findUnique({
        where: { id },
      })
      break

    case ProblemCategory.Choice:
      problem = await prisma.choice.findUnique({
        where: { id },
      })
      break
  }

  if (!problem) {
    return NextResponse.json({ correct: false, message: '問題が見つかりません' })
  }

  const correct = problem.answer === answer
  return NextResponse.json({
    correct,
  })
}
