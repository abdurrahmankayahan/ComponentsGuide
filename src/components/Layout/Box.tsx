import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Spacing } from '../../theme/themes';
import { useTheme } from '../../theme/ThemeContext';

export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const BoxPropsConfig = {
  padding: {
    require: false,
    value: ' Spacing',
  },
  margin: {
    require: false,
    value: ' Spacing',
  },
  width: {
    require: false,
    value: ' number',
  },
  height: {
    require: false,
    value: ' number',
  },
  backgroundColor: {
    require: false,
    value: ' string',
  },
  radius: {
    require: false,
    value: ' number',
  },
  flex: {
    require: false,
    value: ' number',
  },
  style: {
    require: false,
    value: ' ViewStyle',
  },
  children: {
    require: false,
    value: ' React.ReactNode',
  },
} as const;
export type BoxProps = {
  padding?: Spacing;
  margin?: Spacing;
  width?: number;
  height?: number;
  backgroundColor?: string;
  radius?: number;
  flex?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
};

const Box = ({
  padding,
  margin,
  width,
  height,
  backgroundColor,
  radius,
  flex,
  style,
  children,
}: BoxProps) => {
  const { theme, spacing } = useTheme();
  return (
    <View
      style={[
        {
          padding: padding ? spacing[padding] : undefined,
          margin: margin ? spacing[margin] : undefined,
          backgroundColor,
          borderRadius: radius,
          flex,
          width,
          height,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Box;
