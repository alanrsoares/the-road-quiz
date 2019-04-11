import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

import AwesomeButton from "react-native-really-awesome-button";

import styled, { theme } from "@ui/styled";

export const AppContainer = styled.SafeAreaView`
  flex: 1;
  background: ${props => props.theme.colors.primary};
`;

export const AppBody = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.muted};
  justify-content: space-between;
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
  margin: "10px",
  borderRadius: props.theme.radius.default,
  backgroundColor: props.theme.colors.white,
  shadowOpacity: 0.5,
  shadowColor: props.theme.colors.black,
  shadowRadius: props.theme.radius.default,
  shadowOffset: !props.elevation ? 0 : `${0} ${props.elevation}px`
}));

export const QuestionCard = styled(Card)``;

interface ButtonProps {
  onPress: () => void;
  children: string;
  variant: "positive" | "negative" | "neutral";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function BaseButton(props: ButtonProps) {
  return (
    <View style={props.style} testID={props.testID}>
      <AwesomeButton
        testID={props.testID}
        stretch
        textSize={20}
        onPress={props.onPress}
        disabled={props.disabled}
        backgroundColor={
          props.disabled ? theme.colors.neutral : theme.colors.secondary
        }
      >
        {props.children}
      </AwesomeButton>
    </View>
  );
}

export const Button = styled(BaseButton)`
  padding: 10px;
`;
