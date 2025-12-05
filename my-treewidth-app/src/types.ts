export enum ProblemCategory {
  TrueOrFalse = 'TrueOrFalse',
  Input = 'Input',
  Choice = 'Choice',
}

export type Section = {
  id: number
  problems: Problem[]
}
export type Problem = {
  id: number
  category: ProblemCategory
  questionId: number
  sectionId: number
  section: Section
}

export type TrueOrFalse = {
  id: number
  text: string
  graph?: Graph
  tree?: Tree
  answer: number
  reason: string
}

export type Input = {
  id: number
  text: string
  graph?: Graph
  tree?: Tree
  answer: number
  reason: string
}

export type Choice = {
  id: number
  text: string
  graph?: Graph
  tree?: Tree
  answer: number
  reason: string
  options: ChoiceOption[]
}

export type ChoiceOption = {
  id: number
  content: string
  choiceId: number
  choice: Choice
}

export type Graph = {
  id: number
  TrueOrFalse: TrueOrFalse[]
  Input: Input[]
  Choice: Choice[]
  nodes: Node[]
  edges: Edge[]
}

export type Tree = {
  id: number
  TrueOrFalse: TrueOrFalse[]
  Input: Input[]
  Choice: Choice[]
  nodes: Node[]
  edges: Edge[]
}

export type Node = {
  id: number
  nodeKey: string
  x: number
  y: number
  label: string
  graph: Graph[]
  tree: Tree[]
  edgesOut: Edge[]
  edgesIn: Edge[]
}

export type Edge = {
  id: number
  edgeKey: string
  sourceId: number
  source: Node
  target: Node
  targetId: number
  label?: string
  graph: Graph[]
  tree: Tree[]
}

export type ProblemDetail = TrueOrFalse | Input | Choice

export type ProblemWithDetail = Problem & { detail: ProblemDetail }
