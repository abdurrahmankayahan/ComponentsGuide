import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestScreen = () => {
  const theme = useTheme();

  return (
        <SafeAreaView style={[styles.container,{ backgroundColor: useTheme().theme.background}]}>
    
    
   

      <View style={styles.container}>
        <Button />
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

export default TestScreen;
