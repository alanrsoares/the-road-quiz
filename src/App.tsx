import React, { useCallback } from "react";
import { View } from "react-native";
import { ThemeProvider } from "styled-components";

import { shuffle } from "@lib/helpers";
import { INITIAL_STATE } from "@domain/constants";
import { useHandlers } from "@domain/hooks";
import { IQuestionItem } from "@domain/types";

import { theme } from "@ui/styled";
import Screen from "@ui/layouts/Screen";
import { Button, Question, ProgressBar } from "@ui/components";

import { cache as questions } from "@domain/db.json";

interface Props {
  questions: IQuestionItem[];
}

export function App(props: Props) {
  const { state, actions } = useHandlers({
    allQuestions: props.questions,
    initialState: {
      ...INITIAL_STATE,
      questions: shuffle(props.questions).slice(
        0,
        INITIAL_STATE.questionsAmount
      )
    }
  });

  const selectedItem = state.questions[state.index];

  return (
    <Screen>
      <View>
        <ProgressBar
          questionsCount={state.questionsAmount}
          correctCount={state.correctCount}
          incorrectCount={state.incorrectCount}
        />
        <Question
          onSelect={actions.onOptionSelection}
          index={state.index + 1}
          selected={state.selectedOption}
          {...selectedItem.value}
        />
      </View>
      {state.isDone ? (
        <Button
          onPress={actions.onResetState}
          variant="positive"
          disabled={!state.isAnswered}
        >
          Play again
        </Button>
      ) : (
        <Button
          onPress={actions.onNextQuestion}
          variant="neutral"
          disabled={!state.isAnswered}
        >
          Next question
        </Button>
      )}
    </Screen>
  );
}

export default function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <App questions={questions} />
    </ThemeProvider>
  );
}
