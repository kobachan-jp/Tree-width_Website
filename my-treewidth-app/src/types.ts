export enum ProblemCategory {
  TrueOrFalse = "TrueOrFalse",
  Input = "Input",
  Choice = "Choice",
}

export type Problem = {
  id: number;
  category: ProblemCategory;
  questionId: number;
};

export type TrueOrFalse = {
    id: number;
    text: string;
    graphId: number;
    graph: Graph;
    treeId: number;
    tree: Tree;
    answer: number;
    reason: string;
}

export type Input = {
    id: number;
    text: string;
    graphId: number;
    graph: Graph;
    treeId: number;
    tree: Tree;
    answer: number;
    reason: string;
}

export type Choice = {
    id: number;
    text: string;
    graphId: number;
    graph: Graph;
    treeId: number;
    tree: Tree;
    answer: number;
    reason: string;
    options: ChoiceOption;
}

export type ChoiceOption = {
    id: number;
    content : string;
    choiceId: number;
    choice: Choice;
}

export type Graph = {
    id: number;
    TrueOrFalse: TrueOrFalse[];
    Input: Input[];
    Choice: Choice[];
}

export type Tree = {
    id: number;
    TrueOrFalse: TrueOrFalse[];
    Input: Input[];
    Choice: Choice[];
}
