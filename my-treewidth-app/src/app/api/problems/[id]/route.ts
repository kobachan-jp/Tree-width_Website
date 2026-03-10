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

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  //[id]の取得
  const resolvedParams = await props.params
  const id = Number(resolvedParams.id)

  if (isNaN(id) || id <= 0) {
    return NextResponse.json({ error: '無効な Problem ID です' }, { status: 400 })
  }

  const problem = await prisma.problem.findUnique({
    where: { id: id },
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

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const { category, questionId, answer } = await req.json()
  const resolvedParams = await props.params
  const id = Number(resolvedParams.id)
  console.log('answer time')

  const problem = await prisma.problem.findUnique({
    where: { id },
  })

  let question
  switch (category) {
    case ProblemCategory.TrueOrFalse:
      question = await prisma.trueOrFalse.findUnique({
        where: { id: questionId },
      })

      break

    case ProblemCategory.Input:
      question = await prisma.input.findUnique({
        where: { id: questionId },
      })
      break

    case ProblemCategory.Choice:
      question = await prisma.choice.findUnique({
        where: { id: questionId },
      })
      break
  }
  if (!question) {
    return NextResponse.json({ correct: false, message: '問題が見つかりません' })
  }

  const correct = String(question.answer).trim() === String(answer).trim()
  return NextResponse.json({
    correct,
    problem,
  })
}
