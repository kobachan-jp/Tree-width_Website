import ProblemItem from './ProblemItem'
import { ProblemWithDetail, ProblemCategory } from '@/types'

export default function ProblemList({
  problem,
  messages,
  handleAnswer,
}: {
  problem: ProblemWithDetail
  messages: { [id: number]: boolean | undefined }
  handleAnswer: (category: ProblemCategory, questionId: number, answer: number) => void
}) {
  return (
    <>
      <ProblemItem
        key={problem.id}
        p={problem}
        result={messages[problem.id]}
        handleAnswer={handleAnswer}
      />
    </>
  )
}
