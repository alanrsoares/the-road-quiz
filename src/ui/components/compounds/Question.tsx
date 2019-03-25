import React, { useCallback } from "react";
import { Text, FlatList } from "react-native";

import { IQuestion } from "@domain/types";
import styled, { colors } from "@ui/styled";
import { Card } from "@ui/components/core";

const QuestionWrapper = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.colors.primary};
  padding: 10px;
  border-radius: ${props => props.theme.radius.default};
  margin-top: 5px;
  margin-bottom: 5px;
`;

const QuestionText = styled.Text`
  flex: 1;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`;

const QuestionImage = styled.Image<{ size: number; border: number }>`
  height: ${props => props.size - props.border * 2}px;
  width: ${props => props.size - props.border * 2}px;
  border-radius: ${props => (props.size - props.border * 2) / 2};
`;

const ImageWrapper = styled.View<{ size: number; border: number }>`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  border: solid ${props => props.border}px white;
  justify-content: center;
`;

interface OptionProps {
  isSelected: boolean;
  isAnswered: boolean;
  isCorrect: boolean;
}

const getOptionDisplay = (props: OptionProps) =>
  props.isAnswered
    ? props.isSelected || props.isCorrect
      ? "flex"
      : "none"
    : "flex";

export const Option = styled.TouchableOpacity<OptionProps>`
  display: ${getOptionDisplay};
  padding: 10px;
  margin: 5px 0;
  justify-content: center;
  border-radius: ${props => props.theme.radius.default};
  background-color: ${props =>
    props.isAnswered && props.isSelected
      ? props.isCorrect
        ? props.theme.colors.positive
        : props.theme.colors.negative
      : props.theme.colors.muted};
`;

export const OptionText = styled.Text<OptionProps>`
  font-weight: bold;
  color: ${props =>
    props.isAnswered && props.isSelected
      ? props.theme.colors.white
      : props.theme.colors.black};
`;

export const Hint = styled.View`
  color: #666;
  padding: 4px;
`;

interface OptionItem {
  item: { key: string; value: string };
}

interface Props extends IQuestion {
  index: number;
  selected: string | null;
  onSelect(selectedOption: string, isCorrect: boolean): void;
}

export default function Question(props: Props) {
  const handleSelection = useCallback(
    (option: string) => () => {
      if (!!props.selected) {
        return;
      }

      props.onSelect(option, option === props.correctAnswer);
    },
    [props.selected]
  );

  const renderItem = useCallback(
    (answer: OptionItem) => (
      <Option
        onPress={handleSelection(answer.item.key)}
        isAnswered={!!props.selected}
        isCorrect={answer.item.key === props.correctAnswer}
        isSelected={answer.item.key === props.selected}
      >
        <OptionText
          isAnswered={!!props.selected}
          isCorrect={answer.item.key === props.correctAnswer}
          isSelected={answer.item.key === props.selected}
        >
          {answer.item.value}
        </OptionText>
      </Option>
    ),
    [props.selected, props.correctAnswer]
  );

  return (
    <Card elevation={5}>
      <QuestionWrapper>
        <QuestionText>
          #{props.index}: {props.question}
        </QuestionText>
        <ImageWrapper size={100} border={4}>
          <QuestionImage
            size={100}
            border={4}
            source={{ uri: props.image.uri }}
          />
        </ImageWrapper>
      </QuestionWrapper>
      <FlatList
        data={Object.keys(props.answers).map(key => ({
          key,
          value: props.answers[key]
        }))}
        renderItem={renderItem}
      />
      {!!props.selected && (
        <Hint>
          {props.selected !== props.correctAnswer && (
            <Text style={{ color: colors.negative }}>
              Correct Answer: {props.correctAnswer}
            </Text>
          )}
          <Text>
            {`For more information about this question refer to page ${
              props.roadCodePage
            } of the Official New Zealand Road Code.`}
          </Text>
        </Hint>
      )}
    </Card>
  );
}
