import styled from "@ui/styled";

export const AppContainer = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.colors.primary};
`;

export const AppBar = styled.View`
  height: 40;
  background: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

export const AppBody = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.secondary};
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

export const QuestionCard = styled(Card)`
  margin: 10px;
`;
