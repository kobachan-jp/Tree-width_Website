import { ProblemCategory } from '@prisma/client'
import InputProblem from './InputProblem'
import TrueOrFalseProblem from './TrueOrFalseProblem'
import { ProblemWithDetail } from '@/types'

export default function AnswerUI({
  p,
  handleAnswer,
}: {
  p: ProblemWithDetail
  handleAnswer: (id: number, answer: number) => void
}) {
  switch (p.category) {
    case ProblemCategory.TrueOrFalse:
      return <TrueOrFalseProblem p={p} handleAnswer={handleAnswer}></TrueOrFalseProblem>
    case ProblemCategory.Input:
      return <InputProblem p={p} handleAnswer={handleAnswer} />

    default:
      return null
  }
}
