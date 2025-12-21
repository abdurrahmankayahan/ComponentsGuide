import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabNavigation from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import PreviewScreen from '../screen/PreviewScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootStackNavigation = () => {
  const Stack = createStackNavigator();

  return (
 
      <NavigationContainer>
   
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen name="Main" component={TabNavigation} />
          <Stack.Screen name="Preview" component={PreviewScreen} />
        </Stack.Navigator>

      </NavigationContainer>
  );
};

export default RootStackNavigation;
