import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome6';
import SlideBox from '../components/Layout/SlideBox';
import { FlatList } from 'react-native-gesture-handler';
import Box from '../components/Layout/Box';
import InputText from '../components/InputText/InputText';
import Divider from '../components/Divider/Divider';

const TestScreen = () => {
  const theme = useTheme();
  const [val, setVal] = useState('');
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: useTheme().theme.background },
      ]}
    >
      <View style={styles.container}>
        <InputText
          value={val}
          onChangeText={setVal}
          iconLeft={<Icon name="user" size={30} />}
          iconRight={
            <Icon name="circle-exclamation" color={'#911'} size={30} />
          }
          //descriptionText="Kullanıcı adınız yanlıs"
        />
        <Divider vertical={false} size={'xs'} color={theme.theme.primary} />
        <Button
          fullWidth={true}
          title="Log"
          onPress={() => {
            Alert.alert('Mesaj', val);
          }}
        />
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

export default TestScreen;
