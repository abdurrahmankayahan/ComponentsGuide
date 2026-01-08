import React, { ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Box from '../Layout/Box';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Typography } from '../../theme/themes';
import Text from '../Text/Text';
import Icon from 'react-native-vector-icons/FontAwesome6';

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
  rightIconOnPress: {
    require: false,
    value: ' ()=>void',
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
  rightIconOnPress?: () => void;
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
  rightIconOnPress,
}: InputTextProps) => {
  const theme = useTheme().theme;
  const [show, setShow] = useState(isSecure);


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
          secureTextEntry={show}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={'#555'}
          cursorColor={'#eee'}
        />
        {isSecure ? (
          <Box style={styles.rightContainer}>
            <Pressable onPress={() => setShow(!show)}>
              <Icon name={!show ? 'eye-slash' : 'eye'} size={20} color={theme.onBackground}/>
            </Pressable>
          </Box>
        ) : (
          iconRight && (
            <Box style={styles.rightContainer}>
              <Pressable onPress={rightIconOnPress}>{iconRight}</Pressable>
            </Box>
          )
        )}
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
