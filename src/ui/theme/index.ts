import baseStyled, {
  ReactNativeStyledInterface
} from "styled-components/native";

export const colors = {
  primary: "#FFD400",
  secondary: "#3482B9",
  positive: "#49C04A",
  negative: "#D03930",
  neutral: "#AAA",
  muted: "#EAEAEA",
  hotpink: "#FC8BA4",
  black: "#333",
  white: "#FFF",
  gray: "#CCC"
};

export const radius = {
  default: 4
};

export const theme = {
  colors,
  radius
};

export type Theme = typeof theme;
export const styled = baseStyled as ReactNativeStyledInterface<Theme>;
