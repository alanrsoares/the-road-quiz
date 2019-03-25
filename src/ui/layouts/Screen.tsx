import React, { ReactNode } from "react";
import { AppContainer, AppBody, AppBar } from "@ui/components";

interface Props {
  children: ReactNode;
}

export default function Screen(props: Props) {
  return (
    <AppContainer>
      <AppBar />
      <AppBody>{props.children}</AppBody>
    </AppContainer>
  );
}
