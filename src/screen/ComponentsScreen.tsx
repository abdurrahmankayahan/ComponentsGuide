
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
const ComponentsScreen = () => {
  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: useTheme().theme.background}]}>
      <View>
        <Text>Profile Screen</Text>
      </View>
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

export default ComponentsScreen;
