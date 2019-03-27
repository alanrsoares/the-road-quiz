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

const baseRadius = 4;

export const radius = {
  default: baseRadius
};

const baseFontSize = 18;

export const fontSizes = {
  default: baseFontSize,
  small: baseFontSize * 0.8,
  large: baseFontSize * 1.2
};

export const theme = {
  colors,
  radius,
  fontSizes
};

export type Theme = typeof theme;

export default baseStyled as ReactNativeStyledInterface<Theme>;
