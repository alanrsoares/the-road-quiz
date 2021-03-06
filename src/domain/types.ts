export interface IQuestion {
  question: string;
  correctAnswer: string;
  image: {
    uri: string;
  };
  answers: { [key: string]: string };
  roadCodePage: string;
}

export interface IQuestionItem {
  key: string;
  value: IQuestion;
}

export interface HistoryEntry {
  correct: number;
  incorrect: number;
  total: number;
}

export type History = HistoryEntry[];

type Status = "IN_PROGRESS" | "PASSED" | "FAILED";

export interface State {
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  isDone: boolean;
  index: number;
  isAnswered: boolean;
  questions: IQuestionItem[];
  questionsAmount: number;
  status: Status;
  selectedOption: string | null;
}
