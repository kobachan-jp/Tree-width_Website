import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { nodes, edges } = await req.json();

  await prisma.graph.upsert({
    where: { id: 1 },
    update: { nodes, edges },
    create: { id: 1, nodes, edges },
  });
    return NextResponse.json({ ok: true });
}

export async function GET() {
  const graph = await prisma.graph.findUnique({ where: { id: 1 }});
  return NextResponse.json(graph);
}
