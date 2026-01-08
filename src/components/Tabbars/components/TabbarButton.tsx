import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Box from '../../Layout/Box';
import Text from '../../Text/Text';
import { useTheme } from '../../../theme/ThemeContext';

export type TabbarButtonProps = {
  title?: string;
  icon?: ReactNode;
  isFocused?: boolean;
  onPress?: () => void;
};
const TabbarButton = ({
  title,
  icon,
  isFocused,
  onPress,
}: TabbarButtonProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        styles.container,
        isFocused && { bottom:8, backgroundColor: theme.primary + '88' },
      ]}
      onPress={onPress}
    >
      {icon && <Box style={styles.iconContainer}>{icon}</Box>}
      <Text variant='xs'>{title?.substring(0,9)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabbarButton;
