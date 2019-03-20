import baseStyled, {
  ReactNativeStyledInterface
} from "styled-components/native";

import * as theme from "./theme";

export type Theme = typeof theme;
export const styled = baseStyled as ReactNativeStyledInterface<Theme>;
