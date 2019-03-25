import { State } from "@domain/types";

export const INITIAL_STATE: State = {
  answeredCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  isDone: false,
  index: 0,
  isAnswered: false,
  questions: [],
  questionsAmount: 35,
  status: "IN_PROGRESS",
  selectedOption: null
};
