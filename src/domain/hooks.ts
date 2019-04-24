import { useCallback, useState, useEffect } from "react";

import Storage from "@lib/Storage";
import { shuffle } from "@lib/helpers";

import { State, IQuestionItem, History, HistoryEntry } from "@domain/types";

export interface HandlersContext {
  allQuestions: IQuestionItem[];
  initialState: State;
}

const makeActionHandlers = (setState: SetStateFn) => (
  ctx: HandlersContext
) => ({
  onNextQuestion() {
    setState(state =>
      state.index >= state.questionsAmount
        ? state
        : {
            ...state,
            index: state.index + 1,
            isAnswered: false,
            selectedOption: null
          }
    );
  },
  onOptionSelection(selectedOption: string, isCorrect: boolean) {
    setState(state => {
      const hasCompleted = state.index === state.questionsAmount - 1;
      const [correctCount, incorrectCount] = isCorrect
        ? [state.correctCount + 1, state.incorrectCount]
        : [state.correctCount, state.incorrectCount + 1];

      const hasFailed = incorrectCount > 3;

      return {
        ...state,
        selectedOption,
        correctCount,
        incorrectCount,
        isDone: hasCompleted || hasFailed,
        answeredCount: state.answeredCount + 1,
        isAnswered: true,
        status: hasFailed ? "FAILED" : hasCompleted ? "PASSED" : "IN_PROGRESS"
      };
    });
  },
  onResetState() {
    const persistHistoryEntry = async (entry: HistoryEntry) => {
      const history = await Storage.read<History>([], "/history");
      await Storage.persist<History>(
        history.slice(0, 4).concat(entry),
        "/history"
      );
    };

    setState(state => {
      persistHistoryEntry({
        correct: state.correctCount,
        incorrect: state.incorrectCount,
        total: state.questionsAmount
      });

      return {
        ...ctx.initialState,
        questionsAmount: state.questionsAmount,
        questions: shuffle(ctx.allQuestions).slice(0, state.questionsAmount)
      };
    });
  }
});

export type SetStateFn = (value: React.SetStateAction<State>) => void;

export const useHandlers = (ctx: HandlersContext) => {
  const [state, setState] = useState<State>(ctx.initialState);

  // State initialisation
  useEffect(() => {
    const initialiseStateFromCache = async () => {
      const cached = await Storage.read<State>(ctx.initialState);
      setState(cached);
    };
    initialiseStateFromCache();
  }, []);

  // Persistance hook
  useEffect(() => {
    const persist = async (toBePersisted: State) =>
      await Storage.persist(toBePersisted);

    // prevent persisting default state
    if (state !== ctx.initialState) {
      persist(state);
    }
  });

  const makeHandlers = useCallback(makeActionHandlers(setState), [ctx]);

  const actions = makeHandlers(ctx);

  return { state, actions };
};
