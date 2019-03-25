import React from "react";
import styled, { theme } from "@ui/styled";
import { View, Text } from "react-native";
import { ratio } from "@lib/helpers";

const Container = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.colors.neutral};
  height: 30px;
`;

interface ProgressProps {
  ratio: number;
  color: string;
}

const Progress = styled.View<ProgressProps>`
  height: 30px;
  background-color: ${props => props.color};
  width: ${props => props.ratio}%;
`;

interface Props {
  questionsCount: number;
  correctCount: number;
  incorrectCount: number;
}

export default function ProgressBar(props: Props) {
  const answeredCount = props.incorrectCount + props.correctCount;

  const getSampleRatio = ratio(props.questionsCount);
  const progressRatio = getSampleRatio(answeredCount);
  const incorrectRatio = getSampleRatio(props.incorrectCount);
  const correctRatio = getSampleRatio(props.correctCount);

  const ratios = [
    {
      ratio: incorrectRatio,
      color: theme.colors.negative
    },
    {
      ratio: correctRatio,
      color: theme.colors.positive
    }
  ];

  return (
    <Container>
      {ratios.map(x => (
        <Progress key={x.color} ratio={x.ratio} color={x.color} />
      ))}
    </Container>
  );
}
