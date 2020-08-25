import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import colors from '../colors';

type TextType = {
  secondary?: boolean;
  disabled?: boolean;
};
const Text = ({
  children,
  secondary,
  disabled,
  ...props
}: React.PropsWithChildren<TextType>) => (
  <RNText
    {...props}
    style={[
      styles.normal,
      secondary && styles.secondary,
      disabled && styles.disabled,
    ]}>
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  normal: {
    color: colors.textMain,
  },
  secondary: {
    color: colors.textSecondary,
  },
  disabled: {
    color: colors.textDisabled,
  },
});

export default Text;
