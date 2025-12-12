import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number((await params).id)
  console.log(id)
  const section = await prisma.section.findUnique({
    where: { id },
  })
  console.log(section)
  if (!section) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(section)
}
