import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ComponentsScreen from '../screens/ComponentsScreen';
import TestScreen from '../screens/TestScreen';
import { useTheme } from '../theme/ThemeContext';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorScreen from '../screens/ColorScreen';
import PreviewScreen from '../screens/PreviewScreen';
import PagesScreen from '../screens/PagesScreen';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const [themes, setThemes] = useState('');
  const {theme,toggleTheme} = useTheme();

  useEffect(() => {
    async () => {
      await AsyncStorage.getItem('theme').then(val => {
        setThemes(val || '');
      });
    };
  }, [themes]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerBackground:()=><View style={{flex:1, backgroundColor:theme.theme.primary}}></View>,
        tabBarBackground: () => (
          <View
            style={{ flex: 1, backgroundColor: theme.background }}
          ></View>
        ),
        headerTransparent: true,
        headerTintColor: theme.primary,
        headerTitle: '',
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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Components') {
            iconName = 'list';
          } else if (route.name === 'Pages') {
            iconName = 'file';
          } else if (route.name === 'Test') {
            iconName = 'vial';
          } else if (route.name === 'Colors') {
            iconName = 'palette';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
          }

          return (
            <Icon
              name={iconName!}
              size={focused ? size + 2 : size}
              color={focused ? theme.primary : theme.onBackground}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Components" component={ComponentsScreen} />
      <Tab.Screen name="Pages" component={PagesScreen} />

      <Tab.Screen options={() => ({})} name="Test" component={TestScreen} />
      <Tab.Screen name="Colors" component={ColorScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
