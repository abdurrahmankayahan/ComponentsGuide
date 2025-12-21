import React from 'react';
import { StyleSheet, View, Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type TextVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'bold';

export const TextPorpsConfig = {
  variant: {
    require: false,
    value: 'TextVariant',
  },
  weight: {
    require: false,
    value: 'TextWeight',
  },
  color: {
    require: false,
    value: 'string',
  },
  align: {
    require: false,
    value: "'left' | 'center' | 'right'",
  },
  style: {
    require: false,
    value: 'TextStyle',
  },
  children: {
    require: true,
    value: 'React.ReactNode',
  },
};

export interface TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
  children: React.ReactNode;
}

const Text = ({
  variant,
  weight,
  color,
  align,
  style,
  children,
}: TextProps) => {
  const { theme, spacing, typography } = useTheme();
  return (
    <RNText
      style={[
        {
          fontSize: variant ? typography.sizes[variant] : undefined,
          fontWeight: weight
            ? (typography.weights[weight] as TextStyle['fontWeight'])
            : 'normal',
          color: color ? color: theme.onBackground,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({});

export default Text;
