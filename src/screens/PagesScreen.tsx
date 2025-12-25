import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Box from '../components/Layout/Box';
import InputText from '../components/InputText/InputText';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PagesItem, pagesRegistry } from './pages/pages';
import Button from '../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import Divider from '../components/Divider/Divider';

type PagesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface PagesScreenProps {
  navigation: any;
}

const PagesScreen = () => {
  const navigation = useNavigation<PagesScreenNavigationProp>();
  const all = useTheme();
  const theme = all.theme;
  const spacing = all.spacing;

  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState<PagesItem[]>([]);

  useEffect(() => {
    let filteredPages = pagesRegistry;

    if (searchText.trim()) {
      filteredPages = pagesRegistry.filter(
        page =>
          page.name.toLowerCase().includes(searchText.toLowerCase()) ||
          page.description.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setFiltered(filteredPages);
  }, [searchText]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: useTheme().theme.background },
      ]}
    >
      <View style={[styles.container, { padding: spacing.md }]}>
        <InputText
          fullWidth={true}
          placeHolder="Search"
          value={searchText}
          onChangeText={setSearchText}
          iconLeft={
            <Icon
              name="magnifying-glass"
              size={30}
              color={theme.onBackground}
            />
          }
        />
        <Divider shape='round'/>
        <Box flex={1}>

        {filtered.map(item => (
          <Box key={item.id}>
            <Button 
            fullWidth={true}
              title={item.name} 
              iconRight={<Icon name='angle-right' size={24}/>}
              onPress={() => 
                navigation.navigate("Preview", { 
                  pageId: item.id,
                  pageName: item.name 
                })
              } 
            />
          </Box>
        ))}
        </Box>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
});

export default PagesScreen;
