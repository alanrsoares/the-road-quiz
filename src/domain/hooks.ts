import { useCallback, useState, useEffect } from "react";

import Storage from "@lib/Storage";
import { shuffle } from "@lib/helpers";

import { State, IQuestionItem, History, HistoryEntry } from "@domain/types";
import { INITIAL_STATE } from "@domain/constants";

const makeActionHandlers = (
  setState: SetStateFn,
  questions: IQuestionItem[]
) => ({
  onNextQuestion() {
    setState(state =>
      state.index < state.questionsAmount - 1
        ? {
            ...state,
            index: state.index + 1,
            isAnswered: false,
            selectedOption: null
          }
        : state
    );
  },
  async onResetState() {
    const history = await Storage.read<History>([], "/history");

    const saveHistory = async (entry: HistoryEntry) =>
      await Storage.persist<History>(
        [...history.slice(0, 4), entry],
        "/history"
      );

    setState(state => {
      const entry: HistoryEntry = {
        correct: state.correctCount,
        incorrect: state.incorrectCount,
        total: state.questionsAmount
      };

      saveHistory(entry);

      return {
        ...INITIAL_STATE,
        questionsAmount: state.questionsAmount,
        questions: shuffle(questions).slice(0, state.questionsAmount)
      };
    });
  },
  onOptionSelection(selectedOption: string, isCorrect: boolean) {
    setState(state => {
      const isDone = state.index === state.questionsAmount - 1;
      const incorrectCount = !isCorrect
        ? state.incorrectCount + 1
        : state.incorrectCount;
      const correctCount = isCorrect
        ? state.correctCount + 1
        : state.correctCount;
      const isFailed = incorrectCount > 3;

      return {
        ...state,
        selectedOption,
        answeredCount: state.answeredCount + 1,
        correctCount,
        incorrectCount,
        isDone: isDone || isFailed,
        isAnswered: true,
        status: isFailed ? "FAILED" : isDone ? "PASSED" : "IN_PROGRESS"
      };
    });
  }
});

export type SetStateFn = (value: React.SetStateAction<State>) => void;

export const useHandlers = (questions: IQuestionItem[]) => {
  const defaultState = {
    ...INITIAL_STATE,
    questions: questions.slice(0, INITIAL_STATE.questionsAmount)
  };

  const [state, setState] = useState<State>(defaultState);

  // State initialisation
  useEffect(() => {
    const initialiseStateFromCache = async () => {
      const cached = await Storage.read<State>(defaultState);
      setState(cached);
    };
    initialiseStateFromCache();
  }, []);

  // Persistance hook
  useEffect(() => {
    const persist = async (toBePersisted: State) => {
      await Storage.persist(toBePersisted);
    };
    // prevent persisting default state
    if (state !== defaultState) {
      persist(state);
    }
  });

  const make = useCallback(() => makeActionHandlers(setState, questions), []);

  const actions = make();

  return { state, actions };
};
