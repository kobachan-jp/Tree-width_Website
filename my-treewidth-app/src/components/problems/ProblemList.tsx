import ProblemItem from './ProblemItem'
import { ProblemWithDetail, ProblemCategory } from '@/types'

export default function ProblemList({
  problems,
  messages,
  handleAnswer,
}: {
  problems: ProblemWithDetail[]
  messages: { [id: number]: boolean | undefined }
  handleAnswer: (
    category: ProblemCategory,
    problemId: number,
    questionId: number,
    answer: number,
  ) => void
}) {
  return (
    <>
      {problems.map((p) => (
        <ProblemItem key={p.id} p={p} result={messages[p.id]} handleAnswer={handleAnswer} />
      ))}
    </>
  )
}
