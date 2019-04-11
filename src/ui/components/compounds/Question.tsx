import React, { useCallback } from "react";
import { Text, FlatList, View } from "react-native";

import { IQuestion } from "@domain/types";
import styled, { colors } from "@ui/styled";
import { Card } from "@ui/components/core";

const QuestionContainer = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.colors.primary};
  padding: 10px;
  border-top-left-radius: ${props => props.theme.radius.default};
  border-top-right-radius: ${props => props.theme.radius.default};
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
  flex-direction: row;
  padding: 10px;
  margin: 5px 0;
  align-items: center;
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

export const Padding = styled.View`
  padding: 5px 10px;
`;

export const Hint = styled.View`
  margin: 10px 0;
`;

export const Pill = styled.View<OptionProps>`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border: solid 2px;
  border-color: ${props =>
    props.isAnswered && props.isCorrect
      ? props.theme.colors.white
      : props.theme.colors.black};
  border-radius: 15px;
  margin-right: 5px;
  background-color: ${props =>
    props.isAnswered && props.isCorrect
      ? props.theme.colors.positive
      : props.theme.colors.white};
`;

export const PillText = styled.Text<OptionProps>`
  font-weight: bold;
  color: ${props =>
    props.isAnswered && props.isCorrect
      ? props.theme.colors.white
      : props.theme.colors.black};
`;

interface OptionItem {
  item: { key: string; value: string };
  index: number;
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
    (option: OptionItem) => (
      <Option
        testID={`option-${option.index}`}
        disabled={!!props.selected}
        onPress={handleSelection(option.item.key)}
        isAnswered={!!props.selected}
        isCorrect={option.item.key === props.correctAnswer}
        isSelected={option.item.key === props.selected}
      >
        <Pill
          isAnswered={!!props.selected}
          isCorrect={option.item.key === props.correctAnswer}
          isSelected={option.item.key === props.selected}
        >
          <PillText
            isAnswered={!!props.selected}
            isCorrect={option.item.key === props.correctAnswer}
            isSelected={option.item.key === props.selected}
          >
            {option.item.key}
          </PillText>
        </Pill>
        <View style={{ flex: 1 }}>
          <OptionText
            isAnswered={!!props.selected}
            isCorrect={option.item.key === props.correctAnswer}
            isSelected={option.item.key === props.selected}
          >
            {option.item.value}
          </OptionText>
        </View>
      </Option>
    ),
    [props.selected, props.correctAnswer]
  );

  return (
    <Card elevation={5}>
      <QuestionContainer>
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
      </QuestionContainer>
      <Padding>
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
      </Padding>
    </Card>
  );
}
