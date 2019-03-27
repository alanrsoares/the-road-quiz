import React from "react";

import { ThemeProvider } from "styled-components";

import { theme } from "@ui/styled";
import Root from "@ui/Root";
import { cache as questions } from "@domain/db.json";

export default function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <Root questions={questions} />
    </ThemeProvider>
  );
}
