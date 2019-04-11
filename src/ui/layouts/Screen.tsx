import React, { ReactNode } from "react";
import { AppContainer, AppBody, AppBar } from "@ui/components";

interface Props {
  children: ReactNode;
  testID?: string;
}

export default function Screen(props: Props) {
  return (
    <AppContainer testID={props.testID}>
      <AppBar />
      <AppBody>{props.children}</AppBody>
    </AppContainer>
  );
}
