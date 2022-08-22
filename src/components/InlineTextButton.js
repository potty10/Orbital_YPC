import React from 'react';
import { Text, Pressable } from 'react-native';
import AppStyles from '../styles/LoginStyles';

export default function InlineTextButton({ onPress, text }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Text
          style={pressed ? AppStyles.pressedInlineTextButton : AppStyles.inlineTextButton}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
}
