import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number((await params).id)

  const problem = await prisma.problem.findUnique({
    where: { id },
  })

  if (!problem) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(problem)
}
