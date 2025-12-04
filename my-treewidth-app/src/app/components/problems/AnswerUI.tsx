import InputProblem from './InputProblem'
import TrueOrFalseProblem from './TrueOrFalseProblem'
import { ProblemWithDetail, ProblemCategory } from '@/types'

export default function AnswerUI({
  p,
  handleAnswer,
}: {
  p: ProblemWithDetail
  handleAnswer: (category: ProblemCategory, id: number, answer: number) => void
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
