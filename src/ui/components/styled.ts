import { styled } from "../theme";

export const AppContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.primary};
`;

export const WelcomeText = styled.Text`
  font-size: 20;
  text-align: center;
  margin: 10px;
`;

export const InstructionsText = styled.Text`
  text-align: center;
  color: #333333;
  margin-bottom: 5px;
`;

export const Card = styled.View<{ elevation?: number }>(props => ({
  padding: "5px 10px",
  borderRadius: props.theme.radius.default,
  backgroundColor: props.theme.colors.white,
  shadowOpacity: 0.5,
  shadowColor: props.theme.colors.black,
  shadowOffset: props.elevation
    ? `${props.elevation}px ${props.elevation}px`
    : 0
}));
