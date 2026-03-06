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

export async function GET(_: Request, props: { params: Promise<{ ProblemId: string }> }) {
  //[ProblemId]の取得
  const resolvedParams = await props.params
  const ProblemId = Number(resolvedParams.ProblemId)

  if (isNaN(ProblemId) || ProblemId <= 0) {
    return NextResponse.json({ error: '無効な Problem ID です' }, { status: 400 })
  }

  const problem = await prisma.problem.findUnique({
    where: { id: ProblemId },
  })

  if (!problem) {
    return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
  }
  const handler = categoryHandlers[problem.category]

  if (!handler) {
    throw new Error(`Not Found for Category: ${problem.category}`)
  }

  const detail = await handler(problem.questionId)

  const problemDetail = {
    ...problem,
    detail,
  }

  return NextResponse.json(problemDetail)
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
