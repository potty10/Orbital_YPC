import React from 'react';
import { Text, Pressable } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function InlineTextButton(props) {
  const style = {};
  if (props.color) {
    style.color = props.color;
  }
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={[pressed ? AppStyles.pressedInlineTextButton : AppStyles.inlineTextButton, style]}
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
