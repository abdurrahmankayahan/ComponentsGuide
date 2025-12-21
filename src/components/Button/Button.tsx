import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'accent';
type ButtonType = 'solid' | 'outline' | 'ghost';


export const ButtonPropsConfig={
  label:
  { 
    require:true,
    value:"string"},
  onPress:
  {  
    require:false,
    value:"void"},
  variant:
  { 
    require:false,
    value:"ButtonVariant"},
  type:
  { 
    require:false,
    value:"ButtonType"},
  disabled:
  { 
    require:false,
    value:"boolean"},
  loading:
  { 
    require:false,
    value:"boolean"},
  style:
  { 
    require:false,
    value:"ViewStyle"},
}as const 

export type ButtonProps={
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  type = 'solid',
  disabled = false,
  loading = false,
  style,
}) => {
  const theme = useTheme().theme;

  const bgColor = theme[variant];
  const textColor = theme[`on${capitalize(variant)}` as keyof typeof theme];
  const borderColor = bgColor;

  const isSolid = type === 'solid';
  const isOutline = type === 'outline';
  const isGhost = type === 'ghost';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isSolid && { backgroundColor: bgColor },
        isOutline && {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor,
        },
        isGhost && { backgroundColor: 'transparent' },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      <Text style={[
       
        { color: textColor },
       
      ]}
      >{label+textColor.toString()}</Text>
    </TouchableOpacity>
  );
};


const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);



const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
