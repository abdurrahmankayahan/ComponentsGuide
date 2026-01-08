import React from 'react';
import {
  ColorValue,
  DimensionValue,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Box from '../Layout/Box';
import { useTheme } from '../../theme/ThemeContext';
import { Theme } from '../../theme/themes';
import { ButtonShape } from '../Button/Button';
import Text from '../Text/Text';

export type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DividerShape = 'round' | 'square';

export const DividerPropsConfig = {
  size: {
    require: false,
    value: 'DividerSize',
  },
  shape: {
    require: false,
    value: 'DividerShape',
  },
  vertical: {
    require: false,
    value: 'boolean',
  },
  lenght: {
    require: false,
    value: 'DimensionValue',
  },
  color: {
    require: false,
    value: 'ColorValue',
  },
} as const;

export type DividerProps = {
  size?: DividerSize;
  shape?: DividerShape;
  vertical?: boolean;
  lenght?: DimensionValue;
  color?: ColorValue;
  text?: string;
  textPosition?: 'left' | 'right' | 'center';
};
const Divider = ({
  size = 'sm',
  shape = 'round',
  vertical = false,
  lenght,
  color = undefined,
  text,
  textPosition = 'center',
}: DividerProps) => {
  const theme = useTheme().theme;

  const styles = createDividerStyles(
    theme,
    vertical,
    lenght
      ? lenght
      : text
      ? textPosition === 'center'
        ? '40%'
        : '70%'
      : '100%',
    shape,
    color,
  )[size];
  return (
    <Box
      justifyContent="space-around"
      flexDirection={vertical ? 'column' : 'row'}
    >
      {text ? (
        textPosition === 'left' ? (
          <>
            <Box style={[styles.container, { width: '10%' }]} />
            <Text
              style={{
                alignSelf: 'center',
                padding: sizeConfig[size].size,
               fontSize:sizeConfig[size].fontSize,

              }}
            >
              {text}
            </Text>

            <Box style={styles.container} />
          </>
        ) : textPosition === 'right' ? (
          <>
            <Box style={styles.container} />

            <Text
              style={{
                alignSelf: 'center',
                padding: sizeConfig[size].size,
               fontSize:sizeConfig[size].fontSize,

              }}
            >
              {text}
            </Text>
            <Box style={[styles.container, { width: '10%' }]} />
          </>
        ) : (
          <>
            <Box style={styles.container} />

            <Text
              style={{
                alignSelf: 'center',
                padding: sizeConfig[size].size,
               fontSize:sizeConfig[size].fontSize,
              }}
            >
              {text}
            </Text>

            <Box style={styles.container} />
          </>
        )
      ) : (
        <Box style={styles.container} />
      )}
    </Box>
  );
};

type DividerStyle = {
  container: ViewStyle;
};

type StyleMap = {
  [key in DividerSize]: DividerStyle;
};

const sizeConfig = {
  xs: {
    size: 2,
    margin: 4,
    borderRadius: 2,
     fontSize:12,
  },
  sm: {
    size: 4,
    margin: 4,
    borderRadius: 4,
     fontSize:16,

  },
  md: {
    size: 8,
    margin: 4,
    borderRadius: 8,
     fontSize:18,

  },
  lg: {
    size: 12,
    margin: 4,
    borderRadius: 12,
     fontSize:22,

  },
  xl: {
    size: 24,
    margin: 4,
    borderRadius: 24,
     fontSize:24,

  },
};

export const createDividerStyles = (
  theme: Theme,
  vertical: boolean,
  lenght: DimensionValue | null,
  shape: ButtonShape,
  color: ColorValue | undefined,
): StyleMap => {
  return {
    xs: {
      container: vertical
        ? {
            alignSelf: 'center',
            width: sizeConfig.xs.size,
            borderRadius: shape === 'round' ? sizeConfig.xs.borderRadius : 2,
            marginHorizontal: sizeConfig.xs.margin,
            height: lenght,
            backgroundColor: color ? color : theme.onBackground,
          }
        : {
            alignSelf: 'center',
            height: sizeConfig.xs.size,
            borderRadius: shape === 'round' ? sizeConfig.xs.borderRadius : 2,
            marginVertical: sizeConfig.xs.margin,
            width: lenght,
            backgroundColor: color ? color : theme.onBackground,
          },
    },
    sm: {
      container: vertical
        ? {
            alignSelf: 'center',
            width: sizeConfig.sm.size,
            borderRadius: shape === 'round' ? sizeConfig.sm.borderRadius : 2,
            marginHorizontal: sizeConfig.sm.margin,
            height: lenght,
            backgroundColor: color ? color : theme.onBackground,
          }
        : {
            alignSelf: 'center',
            height: sizeConfig.sm.size,
            borderRadius: shape === 'round' ? sizeConfig.sm.borderRadius : 2,
            marginVertical: sizeConfig.sm.margin,
            width: lenght,
            backgroundColor: color ? color : theme.onBackground,
          },
    },
    md: {
      container: vertical
        ? {
            alignSelf: 'center',
            width: sizeConfig.md.size,
            borderRadius: shape === 'round' ? sizeConfig.md.borderRadius : 2,
            marginHorizontal: sizeConfig.md.margin,
            height: lenght,
            backgroundColor: color ? color : theme.onBackground,
          }
        : {
            alignSelf: 'center',
            height: sizeConfig.md.size,
            borderRadius: shape === 'round' ? sizeConfig.md.borderRadius : 2,
            marginVertical: sizeConfig.md.margin,
            width: lenght,
            backgroundColor: color ? color : theme.onBackground,
          },
    },
    lg: {
      container: vertical
        ? {
            alignSelf: 'center',
            width: sizeConfig.lg.size,
            borderRadius: shape === 'round' ? sizeConfig.lg.borderRadius : 2,
            marginHorizontal: sizeConfig.lg.margin,
            height: lenght,
            backgroundColor: color ? color : theme.onBackground,
          }
        : {
            alignSelf: 'center',
            height: sizeConfig.lg.size,
            borderRadius: shape === 'round' ? sizeConfig.lg.borderRadius : 2,
            marginVertical: sizeConfig.lg.margin,
            width: lenght,
            backgroundColor: color ? color : theme.onBackground,
          },
    },
    xl: {
      container: vertical
        ? {
            alignSelf: 'center',
            width: sizeConfig.xl.size,
            borderRadius: shape === 'round' ? sizeConfig.xl.borderRadius : 2,
            marginHorizontal: sizeConfig.xl.margin,
            height: lenght,
            backgroundColor: color ? color : theme.onBackground,
          }
        : {
            alignSelf: 'center',
            height: sizeConfig.xl.size,
            borderRadius: shape === 'round' ? sizeConfig.xl.borderRadius : 2,
            marginVertical: sizeConfig.xl.margin,
            width: lenght,
            backgroundColor: color ? color : theme.onBackground,
          },
    },
  };
};
export default Divider;
