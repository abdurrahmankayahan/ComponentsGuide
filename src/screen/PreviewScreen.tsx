import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const PreviewScreen = () => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: useTheme().theme.background },
      ]}
    >
      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
      container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreviewScreen;
