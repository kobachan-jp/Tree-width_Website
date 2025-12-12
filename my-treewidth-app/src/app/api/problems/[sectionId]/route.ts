import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ProblemCategory } from '@prisma/client'

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
        answerOp: true,
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
  //[SectionId]の取得
  const resolvedParams = await props.params
  const sectionId = Number(resolvedParams.sectionId)

  if (isNaN(sectionId) || sectionId <= 0) {
    return NextResponse.json({ error: '無効な Section ID です' }, { status: 400 })
  }

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

export async function POST(req: Request, props: { params: Promise<{ sectionId: string }> }) {
  const { category, questionId, answer } = await req.json()
  const resolvedParams = await props.params
  const sectionId = Number(resolvedParams.sectionId)
  console.log('answer time')
  const section = await prisma.section.findUnique({
    where: { id: sectionId },
  })
  let problem
  switch (category) {
    case ProblemCategory.TrueOrFalse:
      problem = await prisma.trueOrFalse.findUnique({
        where: { id: questionId },
      })
      break

    case ProblemCategory.Input:
      problem = await prisma.input.findUnique({
        where: { id: questionId },
      })
      break

    case ProblemCategory.Choice:
      problem = await prisma.choice.findUnique({
        where: { id: questionId },
      })
      break
  }
  if (!problem) {
    return NextResponse.json({ correct: false, message: '問題が見つかりません' })
  }

  const correct = problem.answer === answer
  return NextResponse.json({
    correct,
    section,
  })
}
