import React from 'react';
import { StyleSheet, View, Text as RNText, TextStyle, ColorValue } from 'react-native';
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
    value: 'ColorValue',
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
  maxlength: {
    require: false,
    value: 'number',
  },
};

export interface TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: ColorValue;
  align?: 'left' | 'center' | 'right';
  style?: TextStyle|TextStyle[];
  children: React.ReactNode;
  maxlength?:number
}

const Text = ({
  variant,
  weight,
  color,
  align,
  style,
  children,
  maxlength,
}: TextProps) => {
  const { theme, spacing, typography } = useTheme();

  // Maxlength kontrolü
  const processedChildren = React.useMemo(() => {
    if (maxlength && typeof children === 'string' && children.length > maxlength) {
      return children.substring(0, maxlength) + '...';
    }
    return children;
  }, [children, maxlength]);

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
      {processedChildren}
    </RNText>
  );
};

const styles = StyleSheet.create({});

export default Text;
