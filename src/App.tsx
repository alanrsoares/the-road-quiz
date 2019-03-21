import React from "react";
import { Platform, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import AwesomeButton from "react-native-really-awesome-button";

import {
  AppBody,
  WelcomeText,
  InstructionsText,
  AppBar,
  QuestionCard,
  AppContainer
} from "@ui/components/styled";

import { theme } from "@ui/styled";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export function MyCompoent(props: Props) {
  return <Text />;
}

interface Props {}

export function App(props: Props) {
  return (
    <AppContainer>
      <AppBar>
        <InstructionsText>To get started, edit App.tsx</InstructionsText>
      </AppBar>
      <AppBody>
        <View style={{ padding: 10 }}>
          <AwesomeButton
            stretch
            textSize={20}
            backgroundColor={theme.colors.positive}
          >
            Do something
          </AwesomeButton>
        </View>

        <QuestionCard elevation={5}>
          <WelcomeText>Welcome to React Native!</WelcomeText>
          <InstructionsText>To get started, edit App.tsx</InstructionsText>
          <InstructionsText>{instructions}</InstructionsText>
        </QuestionCard>
      </AppBody>
    </AppContainer>
  );
}

export default function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
