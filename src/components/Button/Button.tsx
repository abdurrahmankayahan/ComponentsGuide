import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Theme } from '../../theme/themes';
import Text from '../Text/Text';

export const ButtonPropsConfig = {
  title: {
    require: false,
    value: 'string',
  },
  iconLeft: {
    require: false,
    value: 'React.ReactNode',
  },
  iconRight: {
    require: false,
    value: 'React.ReactNode',
  },
  variant: {
    require: false,
    value: 'ButtonVariant',
  },
  shape: {
    require: false,
    value: 'ButtonShape',
  },
  size: {
    require: false,
    value: 'ButtonSize',
  },
  loading: {
    require: false,
    value: 'boolean',
  },
  loadingPosition: {
    require: false,
    value: "'center' | 'left' | 'right'",
  },
  disabled: {
    require: false,
    value: 'boolean',
  },
  fullWidth: {
    require: false,
    value: 'boolean',
  },
  width: {
    require: false,
    value: 'DimensionValue',
  },
  style: {
    require: false,
    value: 'StyleProp<ViewStyle>',
  },
  onPress: {
    require: false,
    value: 'void',
  },
} as const;

export type ButtonVariant =
  | 'elevated'
  | 'filled'
  | 'tonal'
  | 'outlined'
  | 'text';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'round' | 'square';

export type ButtonProps = {
  title?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean;
  loadingPosition?: 'center' | 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const Button = ({
  title,
  iconLeft,
  iconRight,
  variant = 'filled',
  shape = 'square',
  size = 'md',
  loading = false,
  loadingPosition = 'center',
  disabled = false,
  fullWidth = false,
  width,
  style,
  onPress,
}: ButtonProps) => {
  const theme = useTheme().theme;
  const styles = createButtonStyles(theme)[variant][size];

  const isDisabled = disabled || loading;
  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.container,
        
        {
          margin:Spacing.sm,
          alignSelf:fullWidth?"stretch":"center",
          borderRadius: shape === 'round' ? 100 : styles.container.borderRadius,
        },
        { width: width || undefined },
        pressed && getPressedStyle(pressed, variant),
        isDisabled && getDisabledStyle(),

        style,
      ]}
    >
      {loading && loadingPosition === 'center' ? (
        <ActivityIndicator size="large"  color={styles.text.color} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {loading && loadingPosition === 'left' ? (
            <ActivityIndicator size="small" color={styles.text.color} />
          ) : (
            iconLeft && <View style={styles.leftContainer}>{iconLeft}</View>
          )}

          {title && <Text style={styles.text}>{title}</Text>}

          {loading && loadingPosition === 'right' ? (
            <ActivityIndicator size="small" color={styles.text.color} />
          ) : (
            iconRight && <View style={styles.rightContainer}>{iconRight}</View>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default Button;

type ButtonStyle = {
  container: ViewStyle;
  leftContainer: ViewStyle;
  rightContainer: ViewStyle;
  text: TextStyle;
};

type StyleMap = {
  [key in ButtonVariant]: {
    [key in ButtonSize]: ButtonStyle;
  };
};

const sizeConfig = {
  xs: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 14,

    iconSize: 20,
    iconMargin: 4,
  },
  sm: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 14,

    iconSize: 20,
    iconMargin: 8,
  },
  md: {
    height: 56,
    paddingHorizontal: 24,
    borderRadius: 16,
    fontSize: 16,

    iconSize: 24,
    iconMargin: 8,
  },
  lg: {
    height: 96,
    paddingHorizontal: 48,
    borderRadius: 28,
    fontSize: 18,

    iconSize: 32,
    iconMargin: 12,
  },
  xl: {
    height: 136,
    paddingHorizontal: 64,
    borderRadius: 28,
    fontSize: 18,

    iconSize: 40,
    iconMargin: 16,
  },
};

export const createButtonStyles = (theme: Theme): StyleMap => {
  return {
    elevated: {
      xs: {
        container: {
          height: sizeConfig.xs.height,
          paddingHorizontal: sizeConfig.xs.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.xs.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginRight: sizeConfig.xs.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginLeft: sizeConfig.xs.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.xs.fontSize,
          fontWeight: '600',
        },
      },
      sm: {
        container: {
          height: sizeConfig.sm.height,
          paddingHorizontal: sizeConfig.sm.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.sm.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginRight: sizeConfig.sm.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginLeft: sizeConfig.sm.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.sm.fontSize,
          fontWeight: '600',
        },
      },
      md: {
        container: {
          height: sizeConfig.md.height,
          paddingHorizontal: sizeConfig.md.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.md.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginRight: sizeConfig.md.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginLeft: sizeConfig.md.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.md.fontSize,
          fontWeight: '600',
        },
      },
      lg: {
        container: {
          height: sizeConfig.lg.height,
          paddingHorizontal: sizeConfig.lg.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.lg.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginRight: sizeConfig.lg.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginLeft: sizeConfig.lg.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.lg.fontSize,
          fontWeight: '600',
        },
      },
      xl: {
        container: {
          height: sizeConfig.xl.height,
          paddingHorizontal: sizeConfig.xl.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.xl.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginRight: sizeConfig.xl.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginLeft: sizeConfig.xl.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.xl.fontSize,
          fontWeight: '600',
        },
      },
    },
    tonal: {
      xs: {
        container: {
          height: sizeConfig.xs.height,
          paddingHorizontal: sizeConfig.xs.paddingHorizontal,
          backgroundColor: '#888',
          borderRadius: sizeConfig.xs.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginRight: sizeConfig.xs.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginLeft: sizeConfig.xs.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.xs.fontSize,
          fontWeight: '600',
        },
      },
      sm: {
        container: {
          height: sizeConfig.sm.height,
          paddingHorizontal: sizeConfig.sm.paddingHorizontal,
          backgroundColor: '#888',
          borderRadius: sizeConfig.sm.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginRight: sizeConfig.sm.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginLeft: sizeConfig.sm.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.sm.fontSize,
          fontWeight: '600',
        },
      },
      md: {
        container: {
          height: sizeConfig.md.height,
          paddingHorizontal: sizeConfig.md.paddingHorizontal,
          backgroundColor: '#888',
          borderRadius: sizeConfig.md.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginRight: sizeConfig.md.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginLeft: sizeConfig.md.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.md.fontSize,
          fontWeight: '600',
        },
      },
      lg: {
        container: {
          height: sizeConfig.lg.height,
          paddingHorizontal: sizeConfig.lg.paddingHorizontal,
          backgroundColor: '#888',
          borderRadius: sizeConfig.lg.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginRight: sizeConfig.lg.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginLeft: sizeConfig.lg.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.lg.fontSize,
          fontWeight: '600',
        },
      },
      xl: {
        container: {
          height: sizeConfig.xl.height,
          paddingHorizontal: sizeConfig.xl.paddingHorizontal,
          backgroundColor: '#888',
          borderRadius: sizeConfig.xl.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginRight: sizeConfig.xl.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginLeft: sizeConfig.xl.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.xl.fontSize,
          fontWeight: '600',
        },
      },
    },
    filled: {
      xs: {
        container: {
          height: sizeConfig.xs.height,
          paddingHorizontal: sizeConfig.xs.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.xs.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginRight: sizeConfig.xs.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginLeft: sizeConfig.xs.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.xs.fontSize,
          fontWeight: '600',
        },
      },
      sm: {
        container: {
          height: sizeConfig.sm.height,
          paddingHorizontal: sizeConfig.sm.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.sm.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginRight: sizeConfig.sm.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginLeft: sizeConfig.sm.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.sm.fontSize,
          fontWeight: '600',
        },
      },
      md: {
        container: {
          height: sizeConfig.md.height,
          paddingHorizontal: sizeConfig.md.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.md.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginRight: sizeConfig.md.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginLeft: sizeConfig.md.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.md.fontSize,
          fontWeight: '600',
        },
      },

      lg: {
        container: {
          height: sizeConfig.lg.height,
          paddingHorizontal: sizeConfig.lg.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.lg.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginRight: sizeConfig.lg.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginLeft: sizeConfig.lg.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.lg.fontSize,
          fontWeight: '600',
        },
      },
      xl: {
        container: {
          height: sizeConfig.xl.height,
          paddingHorizontal: sizeConfig.xl.paddingHorizontal,
          backgroundColor: theme.primary,
          borderRadius: sizeConfig.xl.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginRight: sizeConfig.xl.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginLeft: sizeConfig.xl.iconMargin,
        },
        text: {
          color: theme.onPrimary,
          fontSize: sizeConfig.xl.fontSize,
          fontWeight: '600',
        },
      },
    },
    outlined: {
      xs: {
        container: {
          height: sizeConfig.xs.height,
          paddingHorizontal: sizeConfig.xs.paddingHorizontal,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: sizeConfig.xs.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginRight: sizeConfig.xs.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginLeft: sizeConfig.xs.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.xs.fontSize,
          fontWeight: '600',
        },
      },
      sm: {
        container: {
          height: sizeConfig.sm.height,
          paddingHorizontal: sizeConfig.sm.paddingHorizontal,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: sizeConfig.sm.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginRight: sizeConfig.sm.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginLeft: sizeConfig.sm.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.sm.fontSize,
          fontWeight: '600',
        },
      },
      md: {
        container: {
          height: sizeConfig.md.height,
          paddingHorizontal: sizeConfig.md.paddingHorizontal,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: sizeConfig.md.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginRight: sizeConfig.md.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginLeft: sizeConfig.md.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.md.fontSize,
          fontWeight: '600',
        },
      },
      lg: {
        container: {
          height: sizeConfig.lg.height,
          paddingHorizontal: sizeConfig.lg.paddingHorizontal,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: sizeConfig.lg.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginRight: sizeConfig.lg.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginLeft: sizeConfig.lg.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.lg.fontSize,
          fontWeight: '600',
        },
      },
      xl: {
        container: {
          height: sizeConfig.xl.height,
          paddingHorizontal: sizeConfig.xl.paddingHorizontal,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: sizeConfig.xl.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginRight: sizeConfig.xl.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginLeft: sizeConfig.xl.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.xl.fontSize,
          fontWeight: '600',
        },
      },
    },

    text: {
      xs: {
        container: {
          height: sizeConfig.xs.height,
          paddingHorizontal: sizeConfig.xs.paddingHorizontal,
          borderRadius: sizeConfig.xs.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginRight: sizeConfig.xs.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          marginLeft: sizeConfig.xs.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.xs.fontSize,
          fontWeight: '600',
        },
      },
      sm: {
        container: {
          height: sizeConfig.sm.height,
          paddingHorizontal: sizeConfig.sm.paddingHorizontal,
          borderRadius: sizeConfig.sm.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginRight: sizeConfig.sm.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          marginLeft: sizeConfig.sm.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.sm.fontSize,
          fontWeight: '600',
        },
      },
      md: {
        container: {
          height: sizeConfig.md.height,
          paddingHorizontal: sizeConfig.md.paddingHorizontal,
          borderRadius: sizeConfig.md.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginRight: sizeConfig.md.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          marginLeft: sizeConfig.md.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.md.fontSize,
          fontWeight: '600',
        },
      },
      lg: {
        container: {
          height: sizeConfig.lg.height,
          paddingHorizontal: sizeConfig.lg.paddingHorizontal,
          borderRadius: sizeConfig.lg.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginRight: sizeConfig.lg.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          marginLeft: sizeConfig.lg.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.lg.fontSize,
          fontWeight: '600',
        },
      },
      xl: {
        container: {
          height: sizeConfig.xl.height,
          paddingHorizontal: sizeConfig.xl.paddingHorizontal,
          borderRadius: sizeConfig.xl.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
        },
        leftContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginRight: sizeConfig.xl.iconMargin,
        },
        rightContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          marginLeft: sizeConfig.xl.iconMargin,
        },
        text: {
          color: theme.onBackground,
          fontSize: sizeConfig.xl.fontSize,
          fontWeight: '600',
        },
      },
    },
  };
};

export const getPressedStyle = (pressed: boolean, variant: ButtonVariant) => {
  if (!pressed) return null;

  if (variant === 'filled') {
    return {
      opacity: 0.85,
    };
  }

  return { opacity: 0.6 };
};

export const getDisabledStyle = () => ({
  opacity: 0.4,
});
