import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import TabNavigation from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import PreviewScreen from '../screens/PreviewScreen';
import LoginPage from '../screens/pages/LoginPage';
import { useTheme } from '../theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome6';

export type RootStackParamList = {
  Main: undefined;
  Preview: {
    pageId: string;
    pageName: string;
  };
};

const RootStackNavigation = () => {
  const [themes, setThemes] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async () => {
      await AsyncStorage.getItem('theme').then(val => {
        setThemes(val || '');
      });
    };
  }, [themes]);
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
              headerRight: () => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'flex-end',
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  setThemes(themes === 'light' ? 'dark' : 'light');
                  toggleTheme();
                }}
              >
                <Icon
                  name={themes === 'light' ? 'sun' : 'moon'}
                  size={30}
                  color={theme.onBackground}
                />
              </TouchableOpacity>
            ),
        })}
      >
        <Stack.Screen name="Main" component={TabNavigation} />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: theme.onBackground.toString(),
            headerTransparent: true,
            headerBackTitle: 'Geri'
        
          }}
          name="Preview"
          component={PreviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
