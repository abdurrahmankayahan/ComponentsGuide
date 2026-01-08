import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';
import Box from '../../Layout/Box';
import TabbarButton from '../components/TabbarButton';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../../theme/ThemeContext';
import { Theme } from '../../../theme/themes';

type FloatTabbarProps = BottomTabBarProps;

const FloatTabbar = ({
  state,
  descriptors,
  navigation,
}:FloatTabbarProps) => {
  // 🔥 Tabs 'state.routes' üzerinden geliyor!
  const tabs = state.routes;
  const { theme } = useTheme();
  return (
    <Box
      style={{
        width: '95%',
        bottom: 16,
        alignSelf: 'center',
        padding: 4,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        height: 70,
        backgroundColor: theme.background,
        position: 'absolute',

        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 10 },
        elevation: 1,
      }}
    >
      {tabs.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <TabbarButton
            key={route.key}
            isFocused={isFocused}
            onPress={() => navigation.navigate(route.name)}
            // icon={<Icon name="house" size={24} color={theme.primary} />}
            icon={getIcon(route, isFocused, theme, 20)}
            title={route.name}
          />
          //   <TouchableOpacity
          //     key={route.key}
          //     onPress={() => navigation.navigate(route.name)}
          //     style={{ borderWidth:1, flex: 1, alignItems: "center", justifyContent: "center" }}
          //   >
          //     <Text style={{ color: isFocused ? "blue" : "gray" }}>
          //       {route.name}
          //     </Text>
          //   </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const getIcon = (route: any, focused: boolean, theme: Theme, size: number) => {
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
};

export default FloatTabbar;
