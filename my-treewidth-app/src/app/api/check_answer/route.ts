export async function POST(req: Request): Promise<Response> {
  const { id, answer }: { id: number; answer: boolean } = await req.json()

  // 問題ごとの正解データ（本来はDBなどに置く）
  const correctAnswers: Record<number, boolean> = {
    1: true, // 問題1は○
    2: false, // 問題2は×
    3: true, // 問題3は○
  }

  const correct = correctAnswers[id]

  if (correct === undefined) {
    return new Response(JSON.stringify({ error: '無効な問題ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const isCorrect = answer === correct

  return new Response(JSON.stringify({ correct: isCorrect }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
