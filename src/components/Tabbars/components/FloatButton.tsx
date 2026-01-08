import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton, { ButtonVariant } from '../../Button/IconButton';

type FloatButtonProps = {
  icon?: ReactNode;
  variant?: ButtonVariant;
  onPress?:()=>void;
};

const FloatButton = ({ icon, variant ,onPress}: FloatButtonProps) => {
  return (
    <IconButton
      style={styles.container}
      variant={variant}
      size="md"
      icon={icon}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 25,
    shadowOffset:{width:0,height:20}
  },
});

export default FloatButton;
