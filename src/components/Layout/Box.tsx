import React from 'react';
import {
  DimensionValue,
  FlexStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
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
    value: ' ViewStyle | ViewStyle[]',
  },
  children: {
    require: false,
    value: ' React.ReactNode',
  },
} as const;
export type BoxProps = {
  padding?: Spacing;
  margin?: Spacing;
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
  radius?: number;
  flex?: number;
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  style?: ViewStyle|ViewStyle[];
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
  flexDirection,
  justifyContent,
  style,
  children,
}: BoxProps) => {
  const { theme, spacing } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: radius,
          flex,
          flexDirection,
          justifyContent,
          width,
          height,
          padding: padding ? spacing[padding] : undefined,
          margin: margin ? spacing[margin] : undefined,
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
