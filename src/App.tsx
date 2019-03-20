import React from "react";
import { Platform } from "react-native";
import { ThemeProvider } from "styled-components";

import {
  AppContainer,
  WelcomeText,
  InstructionsText,
  Card
} from "@ui/components/styled";

import * as theme from "@ui/theme";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

interface Props {}

export function App(props: Props) {
  return (
    <AppContainer>
      <Card elevation={5}>
        <WelcomeText>Welcome to React Native!</WelcomeText>
        <InstructionsText>To get started, edit App.tsx</InstructionsText>
        <InstructionsText>{instructions}</InstructionsText>
      </Card>
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
