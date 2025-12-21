/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RootStackNavigation from './src/navigation/RootStackNavigation';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';



function App() {
  const isDarkMode = useColorScheme() === 'dark';
    

  return (
    <SafeAreaProvider >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <ThemeProvider>
      <SafeAreaProvider >
        <RootStackNavigation></RootStackNavigation>
      </SafeAreaProvider>
    </ThemeProvider>

    // <View style={styles.container}>
    //   <NewAppScreen
    //     templateFileName="App.tsx"
    //     safeAreaInsets={safeAreaInsets}
    //   />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
