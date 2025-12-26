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
  reason: string
  answer: number
  answerOp: ChoiceOption
  options: ChoiceOption[]
}

export type ChoiceOption = {
  id: number
  content: string
  choiceId: number
  correctAnswer: Choice[]
}

export type Graph = {
  id: number
  TrueOrFalse: TrueOrFalse[]
  Input: Input[]
  Choice: Choice[]
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export type GraphNode = {
  id: number
  nodeKey: string
  x: number
  y: number
  label: string
  graphId: number
  graph: Graph
  edgesOut: GraphEdge[]
  edgesIn: GraphEdge[]
}

export type GraphEdge = {
  id: number
  edgeKey: string
  sourceId: number
  source: GraphNode
  target: GraphNode
  targetId: number
  label?: string
  graph: Graph
}

export type Tree = {
  id: number
  TrueOrFalse: TrueOrFalse[]
  Input: Input[]
  Choice: Choice[]
  nodes: TreeNode[]
  edges: TreeEdge[]
}

export type TreeNode = {
  id: number
  nodeKey: string
  x: number
  y: number
  label: string
  treeId: number
  tree: Tree
  edgesOut: TreeEdge[]
  edgesIn: TreeEdge[]
}

export type TreeEdge = {
  id: number
  edgeKey: string
  sourceId: number
  source: Node
  target: Node
  targetId: number
  label?: string
  treeId: number
  tree: Tree
}

export type ProblemDetail = TrueOrFalse | Input | Choice

export type ProblemWithDetail = Problem & { detail: ProblemDetail }
