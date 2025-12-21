
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const SettingsScreen = () => {
  const theme=useTheme()
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:theme.theme.background}]}>

    <View >
      <Text>Settings Screen</Text>
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

export default SettingsScreen;