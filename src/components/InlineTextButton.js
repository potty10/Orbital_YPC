import React from 'react';
import { Text, Pressable } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function InlineTextButton(props) {
  const { color, onPress, text } = props;
  const style = {};
  if (color) {
    style.color = color;
  }
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Text
          style={[pressed ? AppStyles.pressedInlineTextButton : AppStyles.inlineTextButton, style]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
}
