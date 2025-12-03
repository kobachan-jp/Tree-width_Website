import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const problems = await prisma.problem.findMany();
    return NextResponse.json(problems);
}

export async function POST(req: Request) {
    const {id,answer} = await req.json();
    const problem = await prisma.problem.findUnique({where: {id}});

    if(!problem){
        return NextResponse.json({correct: false,message:"問題が見つかりません"});
    }

    const correct = problem.answer === answer;
    return NextResponse.json({
        correct
    });
}