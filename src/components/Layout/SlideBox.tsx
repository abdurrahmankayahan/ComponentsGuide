import React, { Children, ReactNode, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Box from './Box';
import Text from '../Text/Text';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../theme/ThemeContext';

export const SlideBoxPropsConfig = {
  title: {
    require: false,
    value: ' string',
  },
  textPosition: {
    require: false,
    value: ' "center" | "left" | "right" | "justify" ',
  },
  isShow: {
    require: false,
    value: ' boolean',
  },
  children: {
    require: false,
    value: ' ReactNode',
  },
}as const;

export type SlideBoxProps = {
  title?: string;
  textPosition?: 'auto' | 'center' | 'left' | 'right' | 'justify' | undefined;
  isShow?: boolean;
  children?: ReactNode;
};

const SlideBox = ({ title, textPosition, isShow, children }: SlideBoxProps) => {
  const theme = useTheme().theme;
  const [show, setShow] = useState(isShow);
  return (
    <Box
      style={{ borderWidth: 1,}}
      radius={10}
      width="100%"
      margin="xs"
      padding="sm"
      backgroundColor={theme.background}
    >
      <Box
        justifyContent="space-between"
        margin="sm"
        radius={10}
        width={'95%'}
        padding="sm"
        flexDirection="row"
        backgroundColor={theme.surface}
      >
        <Text
          style={{ flex: 1, textAlign: textPosition, color: theme.onSurface }}
        >
          {title || ''}
        </Text>
        <Pressable
          onPress={() => {
            setShow(!show);
          }}
        >
          <Icon
            name={show ? 'angle-up' : 'angle-down'}
            size={20}
            color={theme.onSurface}
          />
        </Pressable>
      </Box>
      <Box>{show && children}</Box>

    </Box>
  );
};

const styles = StyleSheet.create({});

export default SlideBox;
