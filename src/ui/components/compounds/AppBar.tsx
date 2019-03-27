import React from "react";
import { Text } from "react-native";

import styled from "@ui/styled";

export const Container = styled.View`
  height: 44px;
  background: ${props => props.theme.colors.primary};
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.large};
`;

export const Left = styled.View``;
export const Right = styled.View``;

export default function AppBar() {
  return (
    <Container>
      <Left>
        <Text>Foo</Text>
      </Left>
      <Title>The Road Quiz</Title>
      <Right>
        <Text>Bar</Text>
      </Right>
    </Container>
  );
}
