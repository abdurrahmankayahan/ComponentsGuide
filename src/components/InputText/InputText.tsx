import React, { ReactNode } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Box from '../Layout/Box';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Typography } from '../../theme/themes';
import Text from '../Text/Text';

export const InputTextPropsConfig = {
  placeHolder: {
    require: false,
    value: ' string',
  },
  isSecure: {
    require: false,
    value: ' boolean',
  },
  value: {
    require: false,
    value: ' string',
  },
  onChangeText: {
    require: false,
    value: ' (val: string) => void',
  },
  descriptionText: {
    require: false,
    value: ' string',
  },
  fullWidth: {
    require: false,
    value: ' boolean',
  },
  iconLeft: {
    require: false,
    value: ' ReactNode',
  },
  iconRight: {
    require: false,
    value: ' ReactNode',
  },
} as const;
export type InputTextProps = {
  placeHolder?: string;
  isSecure?: boolean;
  value?: string;
  onChangeText?: (val: string) => void;
  descriptionText?: string;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const InputText = ({
  placeHolder = 'Text Field',
  isSecure = false,
  value,
  onChangeText,
  descriptionText,
  fullWidth = true,
  iconLeft,
  iconRight,
}: InputTextProps) => {
  const theme = useTheme().theme;
  return (
    <Box
      style={[
        styles.container,
        {
          alignSelf: fullWidth ? 'stretch' : 'center',
        },
      ]}
    >
      <Box flexDirection="row">
        {iconLeft && <Box style={styles.leftContainer}>{iconLeft}</Box>}

        <TextInput
          style={[styles.textInputStye, { color: theme.onBackground }]}
          placeholder={placeHolder}
          secureTextEntry={isSecure}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={'#555'}
          cursorColor={'#eee'}
        />
        {iconRight && <Box style={styles.rightContainer}>{iconRight}</Box>}
      </Box>
      {descriptionText ? (
        <Text
          style={styles.textDescription}
          color={theme.onSurface}
          variant="xs"
          align="left"
        >
          {descriptionText}
        </Text>
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,

    justifyContent: 'center',
  },
  leftContainer: {
    width: 34,
    height: 34,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 34,
    height: 34,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStye: {
    flexGrow: 1,
  },
  textDescription: {
    color: '#555',
  },
});

export default InputText;
