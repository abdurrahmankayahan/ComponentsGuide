import React, { ReactNode } from 'react';
import {
  ColorValue,
  DimensionValue,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Theme } from '../../theme/themes';
import Box from '../Layout/Box';




export const IconButtonPropsConfig = {
  variant:{ 
    require:false,
    value: "ButtonVariant"},
  size:{ 
    require:false,
    value: "ButtonSize"},
  shape:{ 
    require:false,
    value: "ButtonShape"},
  icon:{ 
    require:false,
    value: "ReactNode"},
  width:{ 
    require:false,
    value: "DimensionValue"},
  height:{ 
    require:false,
    value: "DimensionValue"},
  backgroundColor:{ 
    require:false,
    value: "ColorValue"},
  onPress:{ 
    require:false,
    value: "() => void"},
  style:{ 
    require:false,
    value: "ViewStyle"},
}as const



export type ButtonVariant =
  | 'elevated'
  | 'filled'
  | 'tonal'
  | 'outlined'
  | 'float';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'round' | 'square';

export type IconButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: ReactNode;
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: ColorValue;
  onPress?: () => void;
  style?: ViewStyle;
};

const IconButton = ({
  variant = 'elevated',
  size = 'xs',
  shape = 'round',
  icon,
  width,
  height,
  backgroundColor,
  onPress,
  style,
}: IconButtonProps) => {
  const { theme } = useTheme();
  const styles = createIconButtonStyle(theme, shape)[variant][size];
  return (
    // <Box
    //   style={[
    //     styles.container,
    //     {
    //       width: width ? width : styles.container.width,
    //       height: height ? height : styles.container.height,
    //       backgroundColor: backgroundColor
    //         ? backgroundColor
    //         : styles.container.backgroundColor,
            
    //     },

    //     style ? style : {},
    //   ]}
    // >
      <Pressable
        style={({ pressed }) => [
          //styles.iconContainer,
          //start
         styles.container,
        {
          width: width ? width : styles.container.width,
          height: height ? height : styles.container.height,
          backgroundColor: backgroundColor
            ? backgroundColor
            : styles.container.backgroundColor,
            
        },

        style ? style : {},//end....
          pressed && getPressedStyle(pressed, variant),
        ]}
        onPress={onPress}
      >
        {icon}
      </Pressable>
    // </Box>
  );
};

type IconButtonStyle = {
  container: ViewStyle;
  iconContainer: ViewStyle;
};

type StyleMap = {
  [key in ButtonVariant]: {
    [key in ButtonSize]: IconButtonStyle;
  };
};

const sizeConfig = {
  xs: {
    size: 32,
    borderRadius: 12,
    margin: 2,
    iconSize: 20,
    floatSpaces: 16,
  },
  sm: {
    size: 40,
    borderRadius: 12,
    margin: 2,
    iconSize: 24,
    floatSpaces: 16,
  },
  md: {
    size: 56,
    borderRadius: 16,
    margin: 2,
    iconSize: 32,
    floatSpaces: 16,
  },
  lg: {
    size: 96,
    borderRadius: 28,
    margin: 2,
    iconSize: 32,
    floatSpaces: 16,
  },
  xl: {
    size: 136,
    borderRadius: 28,
    margin: 2,
    iconSize: 40,
    floatSpaces: 16,
  },
};

export const createIconButtonStyle = (
  theme: Theme,
  shape: ButtonShape,
): StyleMap => {
  return {
    elevated: {
      xs: {
        container: {
          width: sizeConfig.xs.size,
          height: sizeConfig.xs.size,
          margin: sizeConfig.xs.margin,
          borderRadius: shape === 'square' ? sizeConfig.xs.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      sm: {
        container: {
          width: sizeConfig.sm.size,
          height: sizeConfig.sm.size,
          margin: sizeConfig.sm.margin,
          borderRadius: shape === 'square' ? sizeConfig.sm.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      md: {
        container: {
          width: sizeConfig.md.size,
          height: sizeConfig.md.size,
          margin: sizeConfig.md.margin,
          borderRadius: shape === 'square' ? sizeConfig.md.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      lg: {
        container: {
          width: sizeConfig.lg.size,
          height: sizeConfig.lg.size,
          margin: sizeConfig.lg.margin,
          borderRadius: shape === 'square' ? sizeConfig.lg.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      xl: {
        container: {
          width: sizeConfig.xl.size,
          height: sizeConfig.xl.size,
          margin: sizeConfig.xl.margin,
          borderRadius: shape === 'square' ? sizeConfig.xl.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    filled: {
      xs: {
        container: {
          width: sizeConfig.xs.size,
          height: sizeConfig.xs.size,
          margin: sizeConfig.xs.margin,
          borderRadius: shape === 'square' ? sizeConfig.xs.borderRadius : 100,
          backgroundColor: theme.primary,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      sm: {
        container: {
          width: sizeConfig.sm.size,
          height: sizeConfig.sm.size,
          margin: sizeConfig.sm.margin,
          borderRadius: shape === 'square' ? sizeConfig.sm.borderRadius : 100,
          backgroundColor: theme.primary,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      md: {
        container: {
          width: sizeConfig.md.size,
          height: sizeConfig.md.size,
          margin: sizeConfig.md.margin,
          borderRadius: shape === 'square' ? sizeConfig.md.borderRadius : 100,
          backgroundColor: theme.primary,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      lg: {
        container: {
          width: sizeConfig.lg.size,
          height: sizeConfig.lg.size,
          margin: sizeConfig.lg.margin,
          borderRadius: shape === 'square' ? sizeConfig.lg.borderRadius : 100,
          backgroundColor: theme.primary,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      xl: {
        container: {
          width: sizeConfig.xl.size,
          height: sizeConfig.xl.size,
          margin: sizeConfig.xl.margin,
          borderRadius: shape === 'square' ? sizeConfig.xl.borderRadius : 100,
          backgroundColor: theme.primary,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    outlined: {
      xs: {
        container: {
          width: sizeConfig.xs.size,
          height: sizeConfig.xs.size,
          margin: sizeConfig.xs.margin,
          borderRadius: shape === 'square' ? sizeConfig.xs.borderRadius : 100,
          backgroundColor: 'transparent',
          borderColor: theme.border,
          borderWidth: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      sm: {
        container: {
          width: sizeConfig.sm.size,
          height: sizeConfig.sm.size,
          margin: sizeConfig.sm.margin,
          borderRadius: shape === 'square' ? sizeConfig.sm.borderRadius : 100,
          backgroundColor: 'transparent',
          borderColor: theme.border,
          borderWidth: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      md: {
        container: {
          width: sizeConfig.md.size,
          height: sizeConfig.md.size,
          margin: sizeConfig.md.margin,
          borderRadius: shape === 'square' ? sizeConfig.md.borderRadius : 100,
          backgroundColor: 'transparent',
          borderColor: theme.border,
          borderWidth: 1,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      lg: {
        container: {
          width: sizeConfig.lg.size,
          height: sizeConfig.lg.size,
          margin: sizeConfig.lg.margin,
          borderRadius: shape === 'square' ? sizeConfig.lg.borderRadius : 100,
          backgroundColor: 'transparent',
          borderColor: theme.border,
          borderWidth: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      xl: {
        container: {
          width: sizeConfig.xl.size,
          height: sizeConfig.xl.size,
          margin: sizeConfig.xl.margin,
          borderRadius: shape === 'square' ? sizeConfig.xl.borderRadius : 100,
          backgroundColor: 'transparent',
          borderColor: theme.border,
          borderWidth: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    tonal: {
      xs: {
        container: {
          width: sizeConfig.xs.size,
          height: sizeConfig.xs.size,
          margin: sizeConfig.xs.margin,
          borderRadius: shape === 'square' ? sizeConfig.xs.borderRadius : 100,
          backgroundColor: '#555',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      sm: {
        container: {
          width: sizeConfig.sm.size,
          height: sizeConfig.sm.size,
          margin: sizeConfig.sm.margin,
          borderRadius: shape === 'square' ? sizeConfig.sm.borderRadius : 100,
          backgroundColor: '#555',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      md: {
        container: {
          width: sizeConfig.md.size,
          height: sizeConfig.md.size,
          margin: sizeConfig.md.margin,
          borderRadius: shape === 'square' ? sizeConfig.md.borderRadius : 100,
          backgroundColor: '#555',

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      lg: {
        container: {
          width: sizeConfig.lg.size,
          height: sizeConfig.lg.size,
          margin: sizeConfig.lg.margin,
          borderRadius: shape === 'square' ? sizeConfig.lg.borderRadius : 100,
          backgroundColor: '#555',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      xl: {
        container: {
          width: sizeConfig.xl.size,
          height: sizeConfig.xl.size,
          margin: sizeConfig.xl.margin,
          borderRadius: shape === 'square' ? sizeConfig.xl.borderRadius : 100,
          backgroundColor: '#555',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },

    float: {
      xs: {
        container: {
          width: sizeConfig.xs.size,
          height: sizeConfig.xs.size,
          margin: sizeConfig.xs.margin,
          borderRadius: shape === 'square' ? sizeConfig.xs.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          position: 'absolute',
          bottom: sizeConfig.xs.floatSpaces,
          right: sizeConfig.xs.floatSpaces,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xs.iconSize,
          height: sizeConfig.xs.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      sm: {
        container: {
          width: sizeConfig.sm.size,
          height: sizeConfig.sm.size,
          margin: sizeConfig.sm.margin,
          borderRadius: shape === 'square' ? sizeConfig.sm.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          position: 'absolute',
          bottom: sizeConfig.xs.floatSpaces,
          right: sizeConfig.xs.floatSpaces,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.sm.iconSize,
          height: sizeConfig.sm.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      md: {
        container: {
          width: sizeConfig.md.size,
          height: sizeConfig.md.size,
          margin: sizeConfig.md.margin,
          borderRadius: shape === 'square' ? sizeConfig.md.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          position: 'absolute',
          bottom: sizeConfig.xs.floatSpaces,
          right: sizeConfig.xs.floatSpaces,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.md.iconSize,
          height: sizeConfig.md.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      lg: {
        container: {
          width: sizeConfig.lg.size,
          height: sizeConfig.lg.size,
          margin: sizeConfig.lg.margin,
          borderRadius: shape === 'square' ? sizeConfig.lg.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          position: 'absolute',
          bottom: sizeConfig.xs.floatSpaces,
          right: sizeConfig.xs.floatSpaces,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.lg.iconSize,
          height: sizeConfig.lg.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      xl: {
        container: {
          width: sizeConfig.xl.size,
          height: sizeConfig.xl.size,
          margin: sizeConfig.xl.margin,
          borderRadius: shape === 'square' ? sizeConfig.xl.borderRadius : 100,
          backgroundColor: theme.primary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.5,
          elevation: 1,
          position: 'absolute',
          bottom: sizeConfig.xs.floatSpaces,
          right: sizeConfig.xs.floatSpaces,

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconContainer: {
          width: sizeConfig.xl.iconSize,
          height: sizeConfig.xl.iconSize,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  };
};

export const getPressedStyle = (pressed: boolean, variant: ButtonVariant) => {
  if (!pressed) return null;

  return { opacity: 0.8 };
};

export default IconButton;
